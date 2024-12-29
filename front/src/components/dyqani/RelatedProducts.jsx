import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import ShopCard from './ShopCard';


const RelatedProducts = (props) => {
 
  return (
    
      <div style={{ width: '50%', margin:'30px auto'}}>
        <Row className="g-4" style={{justifyContent:'center'}}>
          {props.related.map((product, index) => (
            <Col md={12} lg={6} key={index}>
              <ShopCard {...product}/> 
            </Col>
          ))}
        </Row>
      
    </div>
  );
};

export default RelatedProducts;