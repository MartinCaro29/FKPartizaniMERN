import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Image, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePlayer = () => {
  


  const [newPlayer, setNewPlayer] = useState({
    name: '',
    surname: '',
    shirtNumber: '',
    position: '',
    image: '',
    foot: ''
  });


  const [uploadedImage, setUploadedImage] = useState(null);


  
  const [message, setMessage] = useState({ text: "", color: "" });


  const handleChange = (e) => {
    setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
  };


  const handleImage = (e) => {
    setNewPlayer({ ...newPlayer, image: e.target.files[0] });
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
  };


  const validateShirtNumber = (shirtNumber) => {
    const numberRegex = /^[0-9]+$/;  // Only digits allowed
    return numberRegex.test(shirtNumber) && shirtNumber > 0 && shirtNumber <= 99;
  };


  const validateName = (name) => {
    const nameRegex = /^[çÇëËA-Za-z\s-]+$/;  // Only letters, spaces, and hyphens allowed
    return nameRegex.test(name);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!validateShirtNumber(newPlayer.shirtNumber)) {
      setMessage({ text: "Vlera invalide per numrin!", color: "red" });
      return;
    }


    if (!validateName(newPlayer.name) || !validateName(newPlayer.surname)) {
      setMessage({ text: "Vlera invalide per emrin ose mbiemrin!", color: "red" });
      return;
    }


    
    setMessage({ text: "", color: "" });


    const formData = new FormData();
    Object.entries(newPlayer).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {

      await axios.post("http://localhost:5000/addPlayer", formData)
        .then((res) => {
          console.log(res.data);

          setMessage({ text: "Lojtari u shtua me sukses!", color: "green" });


        })
        .catch((err) => {

          if (err.response && err.response.data) {
            setMessage({ text:"Njera nga te dhenat ekziston ne databaze! Lojtari nuk u krijua!", color: "red" });
          } else {
            setMessage({ text: "Lojtari nuk u krijua!", color: "red" });
          }
        });
    } catch (err) {
      console.error("Error server, Player not created: " + err);
      setMessage({ text: "Lojtari nuk u krijua!", color: "red" });
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Krijo lojtar</h1>
          {/* Show error message if any validation fails */}
          
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Player Name Input */}
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Emri</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newPlayer.name}
                onChange={handleChange}
                autocomplete="off"
              />
            </Form.Group>

            {/* Player Surname Input */}
            <Form.Group className="mb-3" controlId="surname">
              <Form.Label>Mbiemri</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={newPlayer.surname}
                onChange={handleChange}
                autocomplete="off"
              />
            </Form.Group>

            {/* Shirt Number Input */}
            <Form.Group className="mb-3" controlId="shirtNumber">
              <Form.Label>Numri</Form.Label>
              <Form.Control
                type="number"
                name="shirtNumber"
                value={newPlayer.shirtNumber}
                onChange={handleChange}
                autocomplete="off"
              />
            </Form.Group>

            {/* Player Position Selection */}
            <Form.Group className="mb-3" controlId="position">
              <Form.Label>Pozicioni</Form.Label>
              <Form.Control
                as="select"
                name="position"
                value={newPlayer.position}
                onChange={handleChange}
              >
                <option value="" select disabled>Select Position</option>
                <option value="Sulmues">Sulmues</option>
                <option value="Mesfushor">Mesfushor</option>
                <option value="Mbrojtes">Mbrojtes</option>
                <option value="Portier">Portier</option>
              </Form.Control>
            </Form.Group>

            {/* Foot Preference Selection */}
            <Form.Group className="mb-3" controlId="foot">
              <Form.Label>Kemba</Form.Label>
              <Form.Control
                as="select"
                name="foot"
                value={newPlayer.foot}
                onChange={handleChange}
                
              >
                <option value="">Select Foot</option>
                <option value="E majta">E majta</option>
                <option value="E djathta">E djathta</option>
                <option value="Te dyja">Te dyja</option>
                <option value="Null">Null</option>
              </Form.Control>
            </Form.Group>

            {/* Player Image Upload */}
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Imazhi</Form.Label>
              <Form.Control
                type="file"
                accept=".jpeg, .png, .jpg"
                onChange={handleImage}
                name="image"
              />
            </Form.Group>

            {/* Display message (success or error) */}
            {message.text && <p style={{ color: message.color }}>{message.text}</p>}

            <Button variant="primary" type="submit">
              Krijo
            </Button>
          </Form>
        </Col>

        {/* Image Preview */}
        <Col>
          <h1>Imazhi i zgjedhur</h1>
          {uploadedImage && (
            <Image
              src={uploadedImage}
              alt="Uploaded"
              rounded
              className="img-fluid"
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePlayer;
