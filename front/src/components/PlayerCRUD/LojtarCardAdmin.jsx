import React from "react";
import { Card, Button } from "react-bootstrap";
import "./LojtarCardAdmin.css";

import RightFooted from '../../img/right-footed.png';
import LeftFooted from '../../img/left-footed.png';
import BothFooted from '../../img/both-footed.png';

const LojtarCardAdmin = (props) => {
  const { player, deletePlayer } = props; // Destructure the props to get player and deletePlayer

  const getPlayerFoot = (kemba) => {
    if (kemba === 'E majta') return LeftFooted;
    if (kemba === 'E djathta') return RightFooted;
    if (kemba === 'Te dyja') return BothFooted;
    return null;
  };

  // Safely check if player and kemba are available
  const footed = getPlayerFoot(player.foot);

  // If the player object is missing or doesn't contain necessary fields, render a fallback UI
  if (!player) {
    return <div>No player data available</div>;
  }

  // Assuming your image is stored on the server under '/images' path
  const imageUrl = `http://localhost:5000/images/${player.image}`;

  return (
    <Card className="custom-card">
      {footed !== null && (
        <div className="top-right-icon">
          <img src={footed} alt="Player Foot" />
        </div>
      )}
      <Card.Img
        src={imageUrl}
        className="card-image"
        alt={`${player.name} ${player.surname}`}
      />
      <div className="content-below">
        <div className="half-div">
          <strong>{player.shirtNumber}</strong>
        </div>
        <div className="inside-div">
          <div className="player-first-name">{player.name.toUpperCase()}</div>
          <div className="player-last-name">{player.surname.toUpperCase()}</div>
        </div>
        <div className="player-admin-buttons">
          <Button variant="primary" size="sm" href={`/updatePlayer/${player._id}`}>
            Update
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="ml-1"
            onClick={() => deletePlayer(player._id)} // Call deletePlayer from props
          >
            Fshi
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LojtarCardAdmin;
