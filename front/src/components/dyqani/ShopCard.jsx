import React from 'react'
import {Row,Col,Card} from 'react-bootstrap'
import { Container, Button } from 'react-bootstrap';

const ShopCard = (props) => {

    
  return (
    
          <Card className="h-100" style={{ width: '100%', textAlign:'left', justifyContent:'left', userSelect:'none'}}>
            <Card.Img variant="top" src={`http://localhost:5000/Images/${props?.image}`} />
            <Card.Body className = "d-flex flex-column" style={{justifyContent:"space-between"}}>
             <div> 
              <Card.Title>{props?.name}</Card.Title>
              <Card.Text className="text-muted"><i>{props?.category}</i></Card.Text>
              </div>  

              <div className="mt-2">
              <Card.Title className="text-success" style={{fontWeight:'bold'}}>{props?.price} L</Card.Title>
              <div style={{display:'flex', justifyContent:'center'}}>
        
              <Button href={`/dyqani/${props?.slug}`} variant="danger" style={{width:'100%', marginTop:'5px'}}>Blej</Button>
              </div>
              
              </div>
            </Card.Body>
          </Card>
        
  )
}

export default ShopCard