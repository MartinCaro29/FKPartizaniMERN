import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const UpdateMatch = () => {
  const { id } = useParams(); 
  const nav = useNavigate(); 
  const [match, setMatch] = useState({
    competition: "",
    hometeam: "",
    awayteam: "",
    homegoals: "",
    awaygoals: "",
    date: "",
  });


  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getMatch/${id}`);
        const { competition, hometeam, awayteam, homegoals, awaygoals, date } = response.data;
     
        setMatch({
          competition: competition || "",
        hometeam: hometeam || "",
        awayteam: awayteam || "",
        homegoals:homegoals || "",
        awaygoals: awaygoals || "",
        date: date || "",
        });
      } catch (err) {
        console.error("Gabim ne marrjen e te dhenave:", err);
      }
    };
    getInfo();
  }, [id]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatch((prevMatch) => ({
      ...prevMatch,
      [name]: value,
    }));
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

    try {
      
      const response = await axios.patch(`http://localhost:5000/updateMatch/${id}`, {
        ...match,
        competition: makeUpperCase(match.competition),
        hometeam: makeUpperCase(match.hometeam),
        awayteam: makeUpperCase(match.awayteam),
      });

      setMatch(response.data);
      
      nav("/deleteMatch/");
    } catch (err) {
      console.error("Gabim ne perditesimin e ndeshjes:", err);
    }
  };

  return (
    <Container>
      <h1>Perditeso ndeshjen: {match.hometeam} - {match.awayteam}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="competition">
          <Form.Label>Kompeticioni</Form.Label>
          <Form.Control
            type="text"
            value={match.competition}
            name="competition"
            placeholder="Vendos kompeticionin"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="hometeam">
          <Form.Label>Ekipi Prites</Form.Label>
          <Form.Control
            type="text"
            value={match.hometeam}
            name="hometeam"
            placeholder="Vendos emrin e ekipit prites"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="awayteam">
          <Form.Label>Ekipi Mik</Form.Label>
          <Form.Control
            type="text"
            value={match.awayteam}
            name="awayteam"
            placeholder="Vendos emrin e ekipit mik"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="homegoals">
          <Form.Label>Golat Shtepi</Form.Label>
          <Form.Control
            type="number"
            value={match.homegoals}
            name="homegoals"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="awaygoals">
          <Form.Label>Golat Jashte</Form.Label>
          <Form.Control
            type="number"
            value={match.awaygoals}
            name="awaygoals"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Data e Ndeshjes</Form.Label>
          <Form.Control
            type="date"
            value={match.date}
            name="date"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Perditeso Ndeshjen
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateMatch;