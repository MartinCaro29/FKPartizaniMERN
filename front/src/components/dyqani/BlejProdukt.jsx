import React, { useState, useEffect } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Button, Form, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';  
import axios from 'axios';
import RelatedProducts from './RelatedProducts';

const BlejProdukt = () => {
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [numri, setNumri] = useState("");
  const [sms, setSms] = useState("");
  const [smsColor, setSmsColor] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [size, setSize] = useState("null");
  const [showModal, setShowModal] = useState(false);  
  const [isConfirmed, setIsConfirmed] = useState(false); 
  const navigate = useNavigate(); 

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

  const handleSizeChange = (e) => {
    setSize(e.target.value);
    setSms("");  
  };

  const handleBuyClick = () => {
    // Handle "Uniforma" category
    if (filteredProduct.category === "Uniforma") {
      if (size === "null") {
        setSms("Ju duhet te zgjidhni nje madhesi!");
        setSmsColor('red');
        return;
      }
      if (!/^\d+$/.test(numri) || Number(numri) < 1 || Number(numri) > 99) {
        setSms("Vendosni nje numer te sakte!");
        setSmsColor('red');
        return;
      }
    }
  
    // Handle non-clothing categories (e.g., Aksesore)
    if (filteredProduct.category === "Aksesore") {
      setSms(""); // No validation for size or number
    }
  
    // Handle all other categories (e.g., clothing excluding Uniforma)
    if (filteredProduct.category !== "Aksesore" && size === "null") {
      setSms("Ju duhet te zgjidhni nje madhesi!");
      setSmsColor('red');
      return;
    }
  
    setShowModal(true); // Open confirmation modal if validation passes
  };

  const handleConfirmPurchase = () => {
    // Build order data with appropriate validation defaults
    const orderData = {
      name: filteredProduct.name,
      shirtNumber: filteredProduct.category === "Uniforma" ? (numri || -1) : -1,
      size: filteredProduct.category === "Aksesore" ? "N/A" : size,
      price: filteredProduct.price,
      date: new Date(),
    };
  
    axios
      .post("http://localhost:5000/order", orderData)
      .then((response) => {
        console.log("Order successfully placed:", response.data);
        setIsConfirmed(true);
        setShowModal(false);
        navigate("/dyqani");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false); 
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
            <p className="text-muted" style={{ fontSize: '1rem', marginBottom:'2.5vw' }}><i>{filteredProduct?.category}</i></p>
            <h5 className="card-title" style={{ fontSize: '1.5rem', marginBottom:'2.5vw' }}> {filteredProduct?.name}</h5>
            <p className="text-muted" style={{ fontSize: '1rem', marginBottom:'2.5vw' }}>{filteredProduct?.description}</p>

            {(filteredProduct.category !== "Aksesore") && <div style={{ display: 'flex', justifyContent: 'left', gap: '15px', marginBottom:'2.5vw'}}>
              <p className="text-muted mb-2" style={{ marginTop:'6px', fontSize: '1rem'}}>Masa:</p>
              <ButtonGroup>
                <input type="radio" className="btn-check" id="btn-check1" name="options" autoComplete="off" value="S" onChange={handleSizeChange} />
                <label className="btn btn-light" htmlFor="btn-check1">S</label>

                <input type="radio" className="btn-check" id="btn-check2" name="options" autoComplete="off" value="M" onChange={handleSizeChange} />
                <label className="btn btn-light" htmlFor="btn-check2">M</label>

                <input type="radio" className="btn-check" id="btn-check3" name="options" autoComplete="off" value="L" onChange={handleSizeChange} />
                <label className="btn btn-light" htmlFor="btn-check3">L</label>

                <input type="radio" className="btn-check" id="btn-check4" name="options" autoComplete="off" value="XL" onChange={handleSizeChange} />
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
                
              </Form>
            )}
<p style={{ fontSize: '1rem', color: smsColor, display: 'inline' }}>{sms}</p>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <p className="text-success" style={{ fontSize: '3vw', fontWeight:'bold' }}>{filteredProduct?.price} L</p>
            <Button variant="danger" style={{ width: '100%', marginTop:'1vw' }} onClick={handleBuyClick}>Blej</Button>
          </div>
        </div>
      </div>

      {(relatedProducts.length >0) && (
        <div>
          <div className="section-header" style={{ width: '65%', margin: '0px auto', marginTop: '120px'}}>Artikuj te ngjashem:</div>
          <RelatedProducts related={relatedProducts} />
        </div>
      )}

      <Button variant="danger" href={"/dyqani"} style={{ width: '33%', height:'40px', paddingTop: '8px', alignItems:'center' }}>Kthehu te dyqani</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmoni blerjen</Modal.Title>
        </Modal.Header>
        <Modal.Body>A doni ta konfirmoni blerjen?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Jo
          </Button>
          <Button variant="success" onClick={handleConfirmPurchase}>
            Po
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlejProdukt;
