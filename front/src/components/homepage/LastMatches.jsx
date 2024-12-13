import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";

const LastMatches = () => {
  const [matches, setMatches] = useState([]);
  

  useEffect(() => {
    axios
    .get("http://localhost:5000/latestMatches")
    .then((response) => {
      setMatches(response.data);
    })
    .catch((error) => {
      console.log(`Something went wrong: ${error}`);
    });
}, []);
    
  return (
    <Container className="my-4">

<div className="section-header">
  Ndeshjet
</div>
{matches.length === 0 ? (
  <p>Po ngarkohen ndeshjet...</p>
) : (
  <Container>
    {matches.map((match, index) => {
      const getResultColor = () => {
        if ((match.hometeam==="Partizani" && match.homegoals > match.awaygoals)
        || (match.awayteam==="Partizani" && match.homegoals < match.awaygoals)) return "#8bd645";
        if (match.homegoals === match.awaygoals) return "#ebe66c";
        return "#db594d";
      };

      const resultColor = getResultColor();

      return (
        <div className="match-box"  key={index}>
          <span className="color-span" style={{backgroundColor:resultColor}}></span>
            
            
            
            <span style={{ textAlign:'center', fontSize: '0.8rem', marginBottom:'4px', zIndex:1 }}>{match.competition}</span>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize:'1.1rem', alignItems: 'center', zIndex:1 }}>
            <div style={{ flex: 1, textAlign: 'right', paddingRight: '10px' }}>
              <span>{match.hometeam}</span>
            </div>
            <div style={{ flex: 0.3, textAlign: 'center', zIndex:1}}>
              <span>{match.homegoals} - {match.awaygoals}</span>
            </div>
            <div style={{ flex: 1, textAlign: 'left', paddingLeft: '10px', zIndex:1}}>
              <span>{match.awayteam}</span>
            </div>
          </div>
          <div style={{ marginTop: '5px', fontSize: '0.7rem' , zIndex:1}}>
            <span>{new Date(match.date).toLocaleDateString()}</span>
          </div>
        </div>
      );
    })}

    <Button variant='danger' href="/ndeshjet" style={{margin:'0px auto', marginTop:'4px'}}>Ngarko me shume</Button>
  </Container>



)}


    </Container>
  );
};

export default LastMatches;