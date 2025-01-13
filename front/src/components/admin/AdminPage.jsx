import { React, useState, useEffect } from 'react';
import { Row, Col, Container, Card, Button} from 'react-bootstrap';
import axios from 'axios';
import AllContacts from './AllContacts';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [monthlyExpenditure, setMonthlyExpenditure] = useState(0);

  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getAllOrders');
        setOrders(response.data);
        calculateExpenditure(response.data);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

 
  const calculateExpenditure = (orders) => {
    const total = orders.reduce((acc, order) => acc + order.price, 0);
    setMonthlyExpenditure(total);
  };

  return (
    <Container>
      <div className="section-header" style={{marginTop:'25px'}}>Admin</div>

      
      <Card className="card h-100 border-0 shadow-sm card-hover">
        <div className="card-body">
          <h5 className="card-title text-danger fw-bold">Shitjet totale</h5>
          <h2 className="display-6 fw-bold mb-0">{monthlyExpenditure} L</h2>
          
        </div>
      </Card>

    
      <div className="my-4">
      <h5 className="card-title text-danger fw-bold" style={{marginTop:'30px'}}>Porosite</h5>
        {orders.length === 0 ? (
          <p>Nuk ka asnje porosi</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Emri</th>
                <th>Numri i bluzes</th>
                <th>Masa</th>
                <th>Cmimi</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody >
              {orders.map((order, index) => (
                <tr key={index}>
                  <td style={{backgroundColor:'#f1f1f1'}}>{order.name}</td>
                  <td style={{backgroundColor:'#f1f1f1'}}>{order.shirtNumber}</td>
                  <td style={{backgroundColor:'#f1f1f1'}}>{order.size}</td>
                  <td style={{backgroundColor:'#f1f1f1'}}>{order.price} L</td>
                  <td style={{backgroundColor:'#f1f1f1'}}>{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{marginTop:'30px'}}>
        <AllContacts/>
      </div>

      <Row style={{ marginTop: '30px' }}>
  <Col sm={6} md={3}>
    <Card className="border-0 shadow-sm mb-3">
      <h5 className="card-title text-danger fw-bold">Lojtaret</h5>
      <Card.Body>
        <Link to="/addPlayer#top" className="w-100">
          <Button variant="danger" className="w-100">
            Shto lojtar
          </Button>
        </Link>
        <Link to="/deletePlayer#top" className="w-100">
          <Button variant="danger" className="w-100 mt-2">
            Modifiko lojtaret
          </Button>
        </Link>
      </Card.Body>
    </Card>
  </Col>

  <Col sm={6} md={3}>
    <Card className="border-0 shadow-sm mb-3">
      <h5 className="card-title text-danger fw-bold">Produktet</h5>
      <Card.Body>
        <Link to="/addProduct#top" className="w-100">
          <Button variant="danger" className="w-100">
            Shto produkt
          </Button>
        </Link>
        <Link to="/deleteProduct#top" className="w-100">
          <Button variant="danger" className="w-100 mt-2">
            Modifiko produkte
          </Button>
        </Link>
      </Card.Body>
    </Card>
  </Col>

  <Col sm={6} md={3}>
    <Card className="border-0 shadow-sm mb-3">
      <h5 className="card-title text-danger fw-bold">Renditja</h5>
      <Card.Body>
        <Link to="/addTeam#top" className="w-100">
          <Button variant="danger" className="w-100">
            Shto ekipe
          </Button>
        </Link>
        <Link to="/deleteTeam#top" className="w-100">
          <Button variant="danger" className="w-100 mt-2">
            Modifiko renditjen
          </Button>
        </Link>
      </Card.Body>
    </Card>
  </Col>

  <Col sm={6} md={3} >
    <Card className="border-0 shadow-sm mb-3">
      <h5 className="card-title text-danger fw-bold">Ndeshje</h5>
      <Card.Body>
        <Link to="/addMatch#top" className="w-100">
          <Button variant="danger" className="w-100">
            Shto ndeshje
          </Button>
        </Link>
        <Link to="/deleteMatch#top" className="w-100">
          <Button variant="danger" className="w-100 mt-2">
            Modifiko ndeshjet
          </Button>
        </Link>
      </Card.Body>
    </Card>
  </Col>
</Row>
    </Container>
  );
};

export default AdminPage;
