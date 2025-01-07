import React, { useEffect, useState } from "react";
import ProduktCardAdmin from "./ProduktCardAdmin";
import axios from "axios"; 
import { Row, Col, Container } from "react-bootstrap"; 

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    
    axios.get("http://localhost:5000/getAllProducts") 
      .then(response => {
        console.log("Fetched products:", response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Po ngarkohen produktet...</div>; 
  }

  
  
 

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/deleteProduct/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.log(`Failed to delete product: ${error}`);
    }
  };
 

  return (
    <Container>
      
        <h1 style={{textAlign:'center', marginBottom:'20px'}}>Modifiko produktet</h1>
      
      <Row className="g-4">
        {products.map((product, index) => (
          <Col key={index} xl={3} lg={4} sm={6}>
          <ProduktCardAdmin product={product} deleteProduct={deleteProduct}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DeleteProduct;
