import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import axios from "axios";


const CreatePlayer = () => {
  // State to store player details
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    surname: '',
    shirtNumber: '',
    position: '',
    image: '',
    foot: ''
  });

  // State for image preview
  const [uploadedImage, setUploadedImage] = useState(null);

  // State for validation error messages
  const [error, setError] = useState('');
  const [message, setMessage] = useState({ text: "", color: "" });

  // Handle input changes
  const handleChange = (e) => {
    setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
  };

  // Handle file upload for player image
  const handleImage = (e) => {
    setNewPlayer({ ...newPlayer, image: e.target.files[0] });
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
  };

  // Validation function for player number (shirt number)
  const validateShirtNumber = (shirtNumber) => {
    const numberRegex = /^[0-9]+$/;  // Only digits allowed
    return numberRegex.test(shirtNumber) && shirtNumber > 0 && shirtNumber <= 99;
  };

  // Validation function for player name
  const validateName = (name) => {
    const nameRegex = /^[çÇëËA-Za-z\s-]+$/;  // Only letters, spaces, and hyphens allowed
    return nameRegex.test(name);
  };

  // Function to make the first letter of each word uppercase
  const makeUpperCase = (string) => {
    let newString = string.charAt(0).toUpperCase(); // Capitalize first character
    for (let i = 1; i < string.length; i++) {
      let char = string.charAt(i);
      // If previous character is a space and the current character isn't a space, capitalize it
      if ((string.charAt(i - 1) === " ") && string.charAt(i + 1) !== " ") {
        newString += char.toUpperCase();
      }
      else {
        newString += char;
      }
    }
    return newString;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate player number (shirt number)
    if (!validateShirtNumber(newPlayer.shirtNumber)) {
      setMessage({ text: "Vlera invalide per numrin!", color: "red" });
      return;
    }

    // Validate name and surname (only letters, spaces, and hyphens)
    if (!validateName(newPlayer.name) || !validateName(newPlayer.surname)) {
      setMessage({ text: "Vlera invalide per emrin ose mbiemrin!", color: "red" });
      return;
    }

    // Apply the makeUpperCase function to name and surname before submission
    const updatedPlayer = {
      ...newPlayer,
      name: makeUpperCase(newPlayer.name),
      surname: makeUpperCase(newPlayer.surname)
    };

    // Clear any previous error messages
    setError('');
    setMessage({ text: "", color: "" });

    // Create FormData object
    const formData = new FormData();
    Object.entries(updatedPlayer).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      // Make the POST request to the backend
      await axios.post("http://localhost:5000/addPlayer", formData)
        .then((res) => {
          console.log(res.data);
          // After creating, show success message
          setMessage({ text: "Lojtari u shtua me sukses!", color: "green" });
          // Optionally navigate to another page after successful creation
          // navigate("/players");
        })
        .catch((err) => {
          // If there's an error, it could be due to duplication or other issues
          if (err.response && err.response.data) {
            setMessage({ text: "Njera nga te dhenat ekziston ne databaze! Lojtari nuk u krijua!", color: "red" });
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
          <h1>Create Player</h1>
          {/* Show error message if any validation fails */}
          
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Player Name Input */}
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newPlayer.name}
                onChange={handleChange}
                autoComplete="off"
              />
            </Form.Group>

            {/* Player Surname Input */}
            <Form.Group className="mb-3" controlId="surname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={newPlayer.surname}
                onChange={handleChange}
                autoComplete="off"
              />
            </Form.Group>

            {/* Shirt Number Input */}
            <Form.Group className="mb-3" controlId="shirtNumber">
              <Form.Label>Shirt Number</Form.Label>
              <Form.Control
                type="number"
                name="shirtNumber"
                value={newPlayer.shirtNumber}
                onChange={handleChange}
                autoComplete="off"
              />
            </Form.Group>

            {/* Player Position Selection */}
            <Form.Group className="mb-3" controlId="position">
              <Form.Label>Position</Form.Label>
              <Form.Control
                as="select"
                name="position"
                value={newPlayer.position}
                onChange={handleChange}
              >
                <option value="">Select Position</option>
                <option value="Sulmues">Sulmues</option>
                <option value="Mesfushor">Mesfushor</option>
                <option value="Mbrojtes">Mbrojtes</option>
                <option value="Portier">Portier</option>
              </Form.Control>
            </Form.Group>

            {/* Foot Preference Selection */}
            <Form.Group className="mb-3" controlId="foot">
              <Form.Label>Foot</Form.Label>
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
              <Form.Label>Image</Form.Label>
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
              Submit
            </Button>
          </Form>
        </Col>

        {/* Image Preview */}
        <Col>
          <h1>Preview Image</h1>
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
