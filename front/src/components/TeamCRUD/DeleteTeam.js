import React, { useState, useEffect } from "react";
import { Container, Button, Dropdown } from "react-bootstrap";
import axios from "axios";

const DeleteTeam = () => {
  const [teams, setTeams] = useState([]);
  

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getAllTeams");
      setTeams(response.data);
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  };

 

  const deleteTeam = async (teamId) => {
    try {
      await axios.delete(`http://localhost:5000/deleteTeam/${teamId}`);
      setTeams(teams.filter((team) => team._id !== teamId));
    } catch (error) {
      console.log(`Failed to delete team: ${error}`);
    }
  };

  return (
    <Container className="my-4">
      <div className="section-header">Renditja</div>
      {teams.length === 0 ? (
        <p className="text-center">Po ngarkohet renditja...</p>
      ) : (
        <div className="team-list" style={{ fontSize: "1.1rem" }}>
          {teams.map((team, index) => {
            const color1 = team.color1;
            const color2 = team.color2;

            const updateLink = `/updateTeam/${team._id}`;
            return (
              <div
                className="team-row"
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    className="diamond-teamname"
                    style={{ marginLeft: "10px", display: "flex" }}
                  >
                    <div
                      className="diamond-container"
                      style={{
                        position: "relative",
                        display: "inline-block",
                        marginTop: "16px",
                      }}
                    >
                      <div
                        className="diamond-bottom"
                        style={{ borderBottom: `1em solid ${color1}` }}
                      ></div>
                      <div
                        className="diamond-top"
                        style={{ borderTop: `1em solid ${color2}` }}
                      ></div>
                    </div>
                    <div className="team-name" style={{ marginLeft: "15px" }}>
                      {team.teamName}
                    </div>
                  </div>
                </div>
                <div
                  className="team-info"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    className="team-points"
                    style={{ marginTop: "3px", marginRight: "10px" }}
                  >
                    {team.points}
                  </div>

                  <Button variant="primary" size="sm" href={updateLink}>
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ml-1"
                    onClick={() => deleteTeam(team._id)}
                  >
                    Fshi
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

     
    </Container>
  );
};

export default DeleteTeam;
