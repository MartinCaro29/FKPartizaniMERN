let express = require("express");
let app = express();
const Team = require("../Models/standingsModel");
const mongoose = require("mongoose");



app.post("/addTeam", async (req, res) => {
  try {

    let newTeam = new Team(req.body);
    if (
      Number(newTeam.points) < 0 ||
      !Number.isInteger(Number(newTeam.points))
    ) return res.status(400).send("Invalid points number");
    await newTeam.save();
    res.status(200).send(newTeam);
    
  } catch (err) {
    res.status(500).send("Error add:" + err);
    console.log("Error add:" + err);
  }
});

app.get("/getAllTeams", async (req, res) => {
    try {
    
    const teams = await Team.find({}).sort({ points: -1 });
   
    console.log(teams)
    res.status(200).send(teams);
    } catch (err) {
    
    console.log("Error get: " + err)
    res.status(500).send("Error get: " + err);
    }
});

app.get("/getTeam/:id", async (req, res) => {
  try {
    const teamId = req.params.id;
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).send("Team not found");
    }

    res.status(200).send(team); 
  } catch (err) {
    console.log("Error getTeam: " + err);
    res.status(500).send("Error getTeam: " + err); 
  }
});



  app.patch("/updateTeam/:id", async (req, res) => {
    try {
    
    const teamId = req.params.id;
   
    const teamInfo = {...req.body};
   
   
    const teamUpdated = await Team.findByIdAndUpdate(
    {_id: teamId},
    {$set: teamInfo},
    {new: true}
    );
  
    console.log("Data update" + teamUpdated);
    res.status(200).send(teamUpdated);
    } catch (err) {
   
    console.log("Item not updated " + err);
    res.status(500).send("Item not updated " + err);
    }
    });

    app.delete("/deleteTeam/:id", async (req, res) => {
      try {
        const teamId = req.params.id;
    
       
        if (!teamId || !mongoose.Types.ObjectId.isValid(teamId)) {
          return res.status(400).send("Invalid team ID.");
        }
    
        const result = await Team.deleteOne({ _id: teamId });
    
        if (result.deletedCount === 0) {
          return res.status(404).send("Team not found.");
        }
    
        console.log("Team deleted");
        res.status(200).send("Team deleted successfully.");
      } catch (err) {
        console.log("Team not deleted:", err);
        res.status(500).send("Team not deleted: " + err.message);
      }
    });
    
    
module.exports = app;