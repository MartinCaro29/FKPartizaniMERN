import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";


const Standings = () => {
    const [teams, setTeams] = useState([]);
    

  useEffect(() => {
    axios
    .get("http://localhost:5000/getAllTeams")
    .then((response) => {
      setTeams(response.data);
    })
    .catch((error) => {
      console.log(`Something went wrong: ${error}`);
    });
}, []);






return (
    <Container className="my-4">
      <div className="section-header">
        Renditja
      </div>
      {teams.length === 0 ? (
        <p className="text-center">Po ngarkohet renditja...</p>
      ) : (
        <div className="team-list" style={{fontSize:'1.1rem'}} >
          {teams.map((team, index) => {
            
            const changePlacementColor = (index) => {
                if (index >= 0 && index <= 3) return "#8bd645";  
                if (index === 7) return "#f5b8b8"; 
                if (index === 8 || index === 9) return "#e33939"; 
                return "rgb(241, 241, 241)";
              };
            let color1=team.color1;
            let color2=team.color2;
            let placementColor = changePlacementColor(index);
            return (
                <div className="team-row" key={index}>
                <span className="color-span" style={{backgroundColor:placementColor}}></span>
                <div className='diamond-teamname' style={{marginLeft:'10px', display: 'flex'}}>
                <div className='diamond-container' style={{ position: 'relative', display: 'inline-block', marginTop:'16px' }}>
                 
                 
                 <div className="diamond-bottom" style={{borderBottom: `1em solid ${color1}`}}></div>
                  <div className="diamond-top" style={{borderTop: `1em solid ${color2}`}}></div>
                  
                </div>

                <div className="team-name" style={{ marginLeft: '15px' }}>{team.teamName}</div>
    </div>
                
                <div className="team-points" style={{marginTop:'3px', marginRight:'6px'}}>{team.points}</div>
              </div>
            );
          })}
        </div>
      )}
      
     

    </Container>
    
  );
};

export default Standings;