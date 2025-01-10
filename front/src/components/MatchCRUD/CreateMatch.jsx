import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const CreateMatch = () => {
  const [newMatch, setNewMatch] = useState({
    competition:"",
        hometeam:"",
        awayteam:"",
        homegoals:"",
        awaygoals:"",
        date:""
  });
  const [message, setMessage] = useState({ text: "", color: "" });

 
  const handleChange = (e) => {
    setNewMatch({ ...newMatch, [e.target.name]: e.target.value });
  };

  const makeUpperCase = (string) => {
    let newString = string.charAt(0).toUpperCase();
    for (let i = 1; i < string.length; i++) {
      let char = string.charAt(i);
      if ((string.charAt(i - 1) === " " || string.charAt(i - 1) === "-") && string.charAt(i + 1) !== " " && string.charAt(i + 1) !== "-") {
        newString += char.toUpperCase();
      }
      else{newString += char;}
    }
    return newString;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!newMatch.competition || !newMatch.hometeam || !newMatch.awayteam || !newMatch.homegoals || !newMatch.awaygoals || !newMatch.date) {
      setMessage({ text: "Plotesojini te gjitha fushat!", color: "red" });
      return;
    }
    

    if (
      Number(newMatch.homegoals) < 0 ||
      Number(newMatch.awaygoals) < 0 ||
      !Number.isInteger(Number(newMatch.homegoals)) ||
      !Number.isInteger(Number(newMatch.awaygoals))
    ) {
      setMessage({ text: "Vlere e gabuar e golave!", color: "red" });
      return;
    }

    const parsedData = {
      competition: makeUpperCase(newMatch.competition),
      hometeam: makeUpperCase(newMatch.hometeam),
      awayteam: makeUpperCase(newMatch.awayteam),
      homegoals: Number(newMatch.homegoals),
      awaygoals: Number(newMatch.awaygoals),
      date: newMatch.date,
    };

    try {
      await axios.post("http://localhost:5000/addMatch", parsedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setNewMatch({
        competition: "",
        hometeam: "",
        awayteam: "",
        homegoals: "",
        awaygoals: "",
        date: "",
      });
      setMessage({ text: "Ndeshja u shtua!", color: "green" });

    } catch (err) {
      console.error("Gabim:", err);
      setMessage({ text: "Gabim ne shtimin e ndeshjes.", color: "red" });
    }
  };

  return (
    <Container>
      <h1>Krijo nje ndeshje te re</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="competition">
          <Form.Label>Kompeticioni</Form.Label>
          <Form.Control
            type="text"
            value={newMatch.competition}
            name="competition"
            placeholder="Vendos kompeticionin"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="hometeam">
          <Form.Label>Ekipi prites</Form.Label>
          <Form.Control
            type="text"
            value={newMatch.hometeam}
            name="hometeam"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="awayteam">
          <Form.Label>Ekipi mik</Form.Label>
          <Form.Control
            type="text"
            value={newMatch.awayteam}
            name="awayteam"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="homegoals">
          <Form.Label>Golat shtepi</Form.Label>
          <Form.Control
            type="number"
            value={newMatch.homegoals}
            name="homegoals"
            min="0"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="awaygoals">
          <Form.Label>Golat jashte</Form.Label>
          <Form.Control
            type="number"
            value={newMatch.awaygoals}
            name="awaygoals"
            min="0"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Data e ndeshjes</Form.Label>
          <Form.Control
            type="date"
            value={newMatch.date}
            name="date"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        {message.text && <p style={{ color: message.color }}>{message.text}</p>}

        <Button type="submit" variant="primary">
          Krijo ndeshje
        </Button>
      </Form>
    </Container>
  );
};

export default CreateMatch;