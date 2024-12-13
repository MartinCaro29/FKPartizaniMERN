let express = require("express");
let app = express();
const Team = require("../Models/standingsModel");
const mongoose = require("mongoose");



app.post("/addTeam", async (req, res) => {
  try {

    const teamLimit = 10;  
    
    
    const teamCount = await Team.countDocuments();

    
    if (teamCount >= teamLimit) {
      
      return res.status(400).send("Cannot add more teams, the limit has been reached.");
    }


    let newTeam = new Team(req.body);
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
        
        await Team.deleteOne({_id: teamId });
       
        console.log("Team Deleted");
        res.status(200).send("Team Deleted");
        } catch (err) {
       
        console.log("Team not deleted " + err);
        res.status(500).send("Team not deleted " + err); }
    });
    
module.exports = app;