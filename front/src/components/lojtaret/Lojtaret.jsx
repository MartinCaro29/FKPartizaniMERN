import React, { useEffect, useState } from "react";
import LojtarCard from "./LojtarCard";
import axios from "axios"; 
import { Row, Col } from "react-bootstrap"; 

const Lojtaret = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    axios.get("http://localhost:5000/getAllPlayers") 
      .then(response => {
        console.log("Fetched players:", response.data);
        setPlayers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the players!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Po ngarkohen lojtaret...</div>; 
  }

 
  const portiere = players.filter(player => player.position === "Portier");
  const mbrojtes= players.filter(player => player.position === "Mbrojtes");
  const mesfushore = players.filter(player => player.position === "Mesfushor");
  const sulmues = players.filter(player => player.position === "Sulmues");

  return (
    <div className="lojtaret-container">
      <div className="section-header" style={{marginTop:'50px', marginBottom:'40px'}}>Portiere</div>
      <Row className="players-list">
        {portiere.map(player => (
          <Col xl={3} lg={4} md={6} xs={12} key={player._id}>
            <LojtarCard player={player} />
          </Col>
        ))}
      </Row>

      <div className="section-header" style={{marginTop:'50px', marginBottom:'40px'}}>Mbrojtes</div>
      <Row className="players-list">
        {mbrojtes.map(player => (
          <Col xl={3} lg={4} md={6} xs={12} key={player._id}>
            <LojtarCard player={player} />
          </Col>
        ))}
      </Row>

      <div className="section-header" style={{marginTop:'50px', marginBottom:'40px'}}>Mesfushore</div>
      <Row className="players-list">
        {mesfushore.map(player => (
          <Col xl={3} lg={4} md={6} xs={12} key={player._id}>
            <LojtarCard player={player} />
          </Col>
        ))}
      </Row>

      <div className="section-header" style={{marginTop:'50px', marginBottom:'40px'}}>Sulmues </div>
      <Row className="players-list">
        {sulmues.map(player => (
          <Col xl={3} lg={4} md={6} xs={12} key={player._id}>
            <LojtarCard player={player} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Lojtaret;
