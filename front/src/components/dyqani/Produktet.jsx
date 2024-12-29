import {React,useState, useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
import { Container} from 'react-bootstrap';
import axios from 'axios';
import ShopCard from './ShopCard';


const Produktet = (props) => {
  const products = props.products;
  const filteredProducts = props.category === "Te gjitha" 
  ? products 
  : products.filter((product) => product.category === props.category);
  
 

return (
  <Container>
    
      <h1 style={{textAlign:'left'}}>{props.category === "Te gjitha" ? "" : props.category}</h1>
    
    <Row className="g-4">
      {filteredProducts.map((product, index) => (
        <Col key={index} xl={4} lg={6} sm={12}>
        <ShopCard{...product}/>
        </Col>
      ))}
    </Row>
  </Container>
);

}

export default Produktet