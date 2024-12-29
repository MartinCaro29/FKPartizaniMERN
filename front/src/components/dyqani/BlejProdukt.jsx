import React, { useState, useEffect } from 'react';
import { Row, Col, ButtonGroup } from 'react-bootstrap';
import { Container, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RelatedProducts from './RelatedProducts';

const BlejProdukt = () => {
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [numri, setNumri] = useState("");
  const [sms, setSms] = useState("");
  const [smsColor, setSmsColor] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const shuffle = (array) => {
    let shuffledArray = [...array]; 
    let currentIndex = shuffledArray.length;
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[currentIndex],
      ];
    }
    return shuffledArray;
  };

  const handleNumberChange = (e) => {
    let value = e.target.value;
    setNumri(value);

    if (value !== "" && (!/^\d+$/.test(value) || Number(value) > 99 || Number(value) < 1)) {
      setSmsColor('red');
      setSms("Vendosni nje numer te sakte!"); 
    } else {
      setSmsColor('');
      setSms("");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getAllProducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(`Something went wrong: ${error}`);
      });
  }, []);

  const { slug } = useParams();

  
  const filteredProduct = products.find((product) => product.slug === slug);

  useEffect(() => {
    const related = shuffle(
      products.filter((product) => product.slug !== slug && product.category === filteredProduct.category)
        .slice(0, 10)
    );
    setRelatedProducts(related);
  }, [products, filteredProduct, slug]);

  if (!filteredProduct) {
    return <div>Loading...</div>;
  }

  

  return (
    <div style={{marginTop: isMobile ? '10px' : '100px'}}>
      <div className="card" style={{
        width: isMobile ? '95%' : '70%',
        height: isMobile ? '80%' : '45%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        margin: '20px auto',
        userSelect: 'none',
        
      }}>
        <img
          src={`http://localhost:5000/Images/${filteredProduct?.image}`}
          className="card-img-left"
          style={{ width: isMobile ? '100%' : '50%', objectFit: 'cover' }}
        />
        <div className="card-body" style={{
          padding: '15px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box'
        }}>
          <div>
            <p className="text-muted" style={{ fontSize: '1rem',  marginBottom:'2.5vw' }}><i>{filteredProduct?.category}</i></p>
            <h5 className="card-title" style={{ fontSize: '1.5rem',  marginBottom:'2.5vw' }}> {filteredProduct?.name}</h5>
            <p className="text-muted" style={{ fontSize: '1rem',  marginBottom:'2.5vw' }}>{filteredProduct?.description}</p>
            
            
           {(filteredProduct.category !== "Aksesore") && <div style={{ display: 'flex', justifyContent: 'left', gap: '15px', marginBottom:'2.5vw'}}>
            
                
                <p className="text-muted mb-2" style={{ marginTop:'6px', fontSize: '1rem'}}>Masa:</p>
              
              <ButtonGroup>
                <input type="radio" className="btn-check" id="btn-check1" name="options" autoComplete="off" />
                <label className="btn btn-light" htmlFor="btn-check1">S</label>

                <input type="radio" className="btn-check" id="btn-check2" name="options" autoComplete="off" />
                <label className="btn btn-light" htmlFor="btn-check2">M</label>

                <input type="radio" className="btn-check" id="btn-check3" name="options" autoComplete="off" />
                <label className="btn btn-light" htmlFor="btn-check3">L</label>

                <input type="radio" className="btn-check" id="btn-check4" name="options" autoComplete="off" />
                <label className="btn btn-light" htmlFor="btn-check4">XL</label>
              </ButtonGroup>
              
            </div>}
            {filteredProduct?.category === "Uniforma" && (
              <Form style={{ display: 'block', marginTop:'1.5vh', marginBottom:'1.5vw' }}>
                <Form.Group style={{ display: 'flex' }} controlId="numri">
                  <p className="text-muted mb-3" style={{ fontSize: '1rem', marginTop: '5px', marginRight: '9px' }}>Numri: </p>
                  <Form.Control
                    type="text"
                    autoComplete='off'
                    value={numri}
                    onChange={handleNumberChange}
                    style={{ width: '80px', height: '35px' }}
                  />
                </Form.Group>
                <p style={{ fontSize: '1rem', color: smsColor, display: 'inline' }}>{sms}</p>
              </Form>
            )}
          </div>
          <div style={{ marginTop: 'auto' }}>
            <p className="text-success" style={{ fontSize: '3vw', fontWeight:'bold' }}>{filteredProduct?.price} L</p>
            <Button variant="danger" style={{ width: '100%', marginTop:'1vw' }}>Blej</Button>
          </div>
        </div>
      </div>

      
      {(relatedProducts.length >0) && (
        <div>
        <div className="section-header" style={{ width: '65%', margin: '0px auto', marginTop: '120px'}}>Artikuj te ngjashem:</div>
        <RelatedProducts related={relatedProducts} />
        </div>
      )
        }
      
      <Button variant="danger" href={"/dyqani"}style={{ width: '33%', height:'40px', paddingTop: '8px', alignItems:'center' }}>Kthehu te dyqani</Button>
    </div>
  );
};

export default BlejProdukt;
