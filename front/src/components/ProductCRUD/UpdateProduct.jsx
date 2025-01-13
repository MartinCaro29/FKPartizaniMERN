import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Image, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    image: '',
    category: '',
    description: '',
    price: ''
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [message, setMessage] = useState({ text: "", color: "" });

  const navigate = useNavigate();
  
 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getOneProduct/${id}`);
        setProduct(response.data);
        setUploadedImage(response.data.image);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setMessage({ text: "Nuk mund të ngarkohen të dhënat e produktit!", color: "red" });
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
  };

  const validatePrice = (price) => {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(price) && price > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePrice(product.price)) {
      setMessage({ text: "Vlera invalide per cmimin!", color: "red" });
      return;
    }

    setMessage({ text: "", color: "" });
    
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.put(`http://localhost:5000/updateProduct/${id}`, formData);
      setMessage({ text: "Produkti u perditësua me sukses!", color: "green" });
      setTimeout(() => {
        navigate("/deleteProduct");
      }, 2000);
    } catch (err) {
      console.error("Error updating product:", err);
      setMessage({ text: "Produktit nuk iu bë ndryshimi!", color: "red" });
    }
  };
    const imageUrl =`http://localhost:5000/Images/${product.image}`;
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Perditeso produktin</h1>
          {message.text && <p style={{ color: message.color }}>{message.text}</p>}
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
           
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Emri</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                autocomplete="off"
              />
            </Form.Group>

         
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Imazhi</Form.Label>
              <Form.Control
                type="file"
                accept=".jpeg, .png, .jpg"
                onChange={handleImage}
                name="image"
              />
            </Form.Group>

          
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Kategoria</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                <option value="" disabled>Zgjidh kategorine</option>
                <option value="Bluza">Bluza</option>
                <option value="Uniforma">Uniforma</option>
                <option value="Veshje te tjera">Veshje te tjera</option>
                <option value="Aksesore">Aksesore</option>
              </Form.Control>
            </Form.Group>

            
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Pershkrimi</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={product.description}
                onChange={handleChange}
                autocomplete="off"
              />
            </Form.Group>

            
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Cmimi</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                autocomplete="off"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Përditëso
            </Button>
          </Form>
        </Col>

       
        <Col>
          <h1>Imazhi i zgjedhur</h1>
          {uploadedImage ? (
            <Image
              src={uploadedImage}
              alt="Uploaded"
              rounded
              className="img-fluid"
            />
          ) : (
            <Image
              src={imageUrl}
              alt="Current Product"
              rounded
              className="img-fluid"
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProduct;
