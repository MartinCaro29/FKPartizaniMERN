import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Image, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  

  // State to store product details
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    category: '',
    slug: '',
    description:'',
    price:''

  });

  // State for image preview
  const [uploadedImage, setUploadedImage] = useState(null);

  // State for validation error messages
  
  const [message, setMessage] = useState({ text: "", color: "" });

  // Handle input changes
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle file upload for product image
  const handleImage = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
  };

 

  
  const validatePrice = (price) => {
    const numberRegex = /^[0-9]+$/;  // Only digits allowed
    return numberRegex.test(price) && price > 0
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

   
   

    // Validate name and surname (only letters, spaces, and hyphens)
    if (!validatePrice(newProduct.price)) {
      setMessage({ text: "Vlera invalide per cmimin!", color: "red" });
      return;
    }

    // Clear any previous error messages
   
    setMessage({ text: "", color: "" });

    // Create FormData object
    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      // Make the POST request to the backend
      await axios.post("http://localhost:5000/addProduct", formData)
        .then((res) => {
          console.log(res.data);
          // After creating, show success message
          setMessage({ text: "Produkti u shtua me sukses!", color: "green" });
          // Optionally navigate to another page after successful creation
          // navigate("/products");
        })
        .catch((err) => {
         
            setMessage({ text: "Produkti nuk u krijua!", color: "red" });
          
        });
    } catch (err) {
      console.error("Error server, Product not created: " + err);
      setMessage({ text: "Produkti nuk u krijua!", color: "red" });
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Krijo produkt</h1>
          {/* Show error message if any validation fails */}
          
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Product Name Input */}
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Emri</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                autocomplete="off"
              />
            </Form.Group>

            

            {/* Product Image Upload */}
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Imazhi</Form.Label>
              <Form.Control
                type="file"
                accept=".jpeg, .png, .jpg"
                onChange={handleImage}
                name="image"
              />
            </Form.Group>

            {/* Product Position Selection */}
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Kategoria</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={newProduct.category}
                onChange={handleChange}
              >
                <option value="" select disabled>Zgjidh kategorine</option>
                <option value="Bluza">Bluza</option>
                <option value="Uniforma">Uniforma</option>
                <option value="Veshje te tjera">Veshje te tjera</option>
                <option value="Aksesore">Aksesore</option>
              </Form.Control>
            </Form.Group>

            {/* Shirt Number Input */}
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Pershkrimi</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                autocomplete="off"
              />
            </Form.Group>

           {/* Shirt Number Input */}
            <Form.Group className="mb-3" controlId="price">
                <Form.Label>Cmimi</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleChange}
                        autocomplete="off"
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

export default CreateProduct;