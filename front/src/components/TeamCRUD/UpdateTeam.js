import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const UpdateTeam = () => {
  const { id } = useParams(); 
  const nav = useNavigate(); 
  const [team, setTeam] = useState({
    teamName: "",
    color1: "#000000", 
    color2: "#FFFFFF", 
    points: "",
  });
  const [message, setMessage] = useState({ text: "", color: "" });

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getTeam/${id}`);
        const { teamName, color1, color2, points } = response.data;
        setTeam({
          teamName: teamName || "",
          color1: color1 || "#000000", 
          color2: color2 || "#FFFFFF", 
          points: points || "",
        });
      } catch (err) {
        console.error("Gabim ne marrjen e te dhenave:", err);
      }
    };
    getInfo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam((prevTeam) => ({
      ...prevTeam,
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
      if (!team.teamName || !team.color1 || !team.color2 || !team.points) {
        setMessage({ text: "Plotesoni te gjitha fushat!", color: "red" });
        return;
      }


      if (isNaN(team.points) || Number(team.points) < 0) {
        setMessage({ text: "Vlere invalide per piket!", color: "red" });
        return;
      }

      const response = await axios.patch(`http://localhost:5000/updateTeam/${id}`, {
        teamName: makeUpperCase(team.teamName),
        color1: team.color1,
        color2: team.color2,
        points: team.points,
      });

      setTeam(response.data);
      nav("/deleteTeam/");
    } catch (err) {
      console.error("Error updating team:", err);
    }
  };
  
  return (
    <Container>
      <h1>Perditeso skuadren: {team.teamName}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nameTeam">
          <Form.Label>Emri i skuadres</Form.Label>
          <Form.Control
            type="text"
            value={team.teamName}
            name="teamName"
            placeholder="Vendos emrin e skuadres"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="color1Team">
          <Form.Label>Ngjyra 1</Form.Label>
          <Form.Control
            type="color"
            value={team.color1}
            name="color1"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="color2Team">
          <Form.Label>Ngjyra 2</Form.Label>
          <Form.Control
            type="color"
            value={team.color2}
            name="color2"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="pointsTeam">
          <Form.Label>Piket</Form.Label>
          <Form.Control
            type="number"
            value={team.points}
            name="points"
            placeholder="Vendos piket"
            onChange={handleChange}
            autocomplete='off'
          />
        </Form.Group>

        {message.text && <p style={{ color: message.color }}>{message.text}</p>}

        <Button type="submit" variant="primary">
          Perditeso skuadren
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateTeam;
