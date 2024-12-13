import { Container, Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import React, { useState } from 'react';

import axios from "axios";


const Contact = () => {
  const [emri, setEmri] = useState('');
  const [email, setEmail] = useState('');
  const [komenti, setKomenti] = useState('');
  const [sms, setSms] = useState('');
  const [smsColor, setSmsColor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emri || !email || !komenti) {
      setSms('Ploteso te gjitha fushat!');
      setSmsColor('red');
      return;
    }

    if (!/^[a-zA-Z]+$/.test(emri)) {
        setSms('Emri duhet te mbaje vetem germa');
        setSmsColor('red');
        return;
      }

      let uploadDate = new Date().toISOString();

      let newContact = {
        name: emri,
        email: email,
        comment: komenti,
        date: uploadDate
      };
      await axios
        .post("http://localhost:5000/addContact", newContact)
        .then(() => console.log("Added"))
        .catch((err) => console.log("Not added " + err));

    setSms('Te dhenat u derguan me sukses!');
    setSmsColor('green');
  };

  const handleReset = (e) => {
    setEmri("");
    setEmail("");
    setKomenti("")

    setSms('Fushat e te dhenave u fshine me sukses!');
    setSmsColor('#000000');
  };

  return (
    <Container>
        <div className="section-header" style={{marginTop:'50px', marginBottom:'30px', fontSize:'1.7rem' }}>
        Kontakt
      </div>

      <div style={{fontSize:'1.6rem', fontFamily:'cinzel', marginBottom:'30px', color:'rgba(208,0,0,1)'}}>
      Na kontaktoni per cdo pyetje, sugjerim apo problem. Jemi ketu per ju!
      </div>
<Container style={{ width: '100%', padding: '30px', borderRadius: '20px', background: '#ffffff', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)' }}>
      <Form onSubmit={handleSubmit} onReset={handleReset}>

        <Row>
            <Col md={6} xs={12} style={{marginBottom:'10px'}}>
        <Form.Group style={{display:'flex', flexDirection:'column'}}className="mb-3" controlId="emri">
          <Form.Label style={{textAlign:'left', color: '#444'}}><b>Emri</b></Form.Label>
          <Form.Control
            type="text"
            placeholder="Vendos emrin"
            autoComplete='off'
            value={emri}
            onChange={(e) => setEmri(e.target.value)}
          />
        </Form.Group>
        </Col>

            <Col md={6} xs={12}>
        <Form.Group style={{display:'flex', flexDirection:'column'}} className="mb-3" controlId="email">
          <Form.Label style={{textAlign:'left', color: '#444'}}><b>Email</b></Form.Label>
          <Form.Control
            type="email"
            placeholder="Vendos email"
            autoComplete='off'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        </Col>
    </Row>

        <Form.Group style={{display:'flex', flexDirection:'column'}} className="mb-3" controlId="Komenti">
          <Form.Label style={{textAlign:'left', color: '#444'}}><b>Komenti</b></Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Vendos komentin"
            autoComplete='off'
            value={komenti}
            onChange={(e) => setKomenti(e.target.value)}
          />
        </Form.Group>
        <Row className="justify-content-md-center g-2">
            <Col md={4} xs={12}>
            <Button style={{width:'100%', height:'40px', fontSize:'1rem'}} variant="danger" type="reset">Fshi</Button>
            </Col>   
            <Col md={4} xs={12}>
         <Button style={{width:'100%', height:'40px', fontSize:'1rem'}} variant='success' type="submit">Dergo</Button>
            </Col>
        </Row>
        
        <div style={{ color: smsColor, marginTop: '10px' }}>{sms}</div>
      </Form>
      </Container>
    </Container>
  );
};

export default Contact;