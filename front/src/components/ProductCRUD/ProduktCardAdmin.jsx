import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

const ProduktCardAdmin = (props) => {
  const { product, deleteProduct } = props; // Destructure the product prop first
  
  // Now, access product to create the update link
  const updateLink = `/updateProduct/${product._id}`;

  // Fallback for missing image
  const imageUrl =`http://localhost:5000/Images/${product.image}`;

  return (
    <Card className="h-100" style={{ width: '100%', textAlign: 'left', justifyContent: 'left', userSelect: 'none' }}>
      <Card.Img 
        variant="top" 
        src={imageUrl} 
        alt={product.name || 'Product Image'} 
        style={{ objectFit: 'cover', height: '200px' }}
      />
      <Card.Body className="d-flex flex-column" style={{ justifyContent: 'space-between' }}>
        <div>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text className="text-muted"><i>{product.category}</i></Card.Text>
        </div>

        <div className="mt-2">
          <Card.Title className="text-success" style={{ fontWeight: 'bold' }}>{product.price} L</Card.Title>
          <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center' }}>
            <Button variant="primary" size="sm" style={{width:'100%'}} href={updateLink}>
              Update
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteProduct(product._id)} 
              style={{width:'100%' }} // Adding space between buttons
            >
              Fshi
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProduktCardAdmin;
