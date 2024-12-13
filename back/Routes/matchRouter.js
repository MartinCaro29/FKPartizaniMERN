let express = require("express");
let app = express();
const Match = require("../Models/matchModel");
const mongoose = require("mongoose");

app.use(express.json());


app.post("/addMatch", async (req, res) => {
  try {
    let newMatch = new Match(req.body);
    await newMatch.save();
    res.status(200).send(newMatch);
  } catch (err) {
    res.status(500).send("Error add:" + err);
    console.log("Error add:" + err);
  }
});

app.get("/getAllMatches", async (req, res) => {
    try {
    
    const matches = await Match.find({}).sort({ date: -1 });
   
    console.log(matches)
    res.status(200).send(matches);
    } catch (err) {
    
    console.log("Error get: " + err)
    res.status(500).send("Error get: " + err);
    }
});

app.get("/latestMatches", async (req, res) => {
    try {
      
      const matches = await Match.find({}).sort({ date: -1 }).limit(5);
  
      res.status(200).json(matches); 
    } catch (err) {
      console.error("Error fetching matches:", err);
      res.status(500).json({ error: "Failed to fetch matches" }); 
    }
  });

  app.patch("/updateMatch/:id", async (req, res) => {
    try {
    
    const matchId = req.params.id;
   
    const matchInfo = {...req.body};
   
   
    const matchUpdated = await Match.findByIdAndUpdate(
    {_id: matchId},
    {$set: matchInfo},
    {new: true}
    );
  
    console.log("Data update" + matchUpdated);
    res.status(200).send(matchUpdated);
    } catch (err) {
   
    console.log("Item not updated " + err);
    res.status(500).send("Item not updated " + err);
    }
    });

    app.delete("/deleteMatch/:id", async (req, res) => {
        try {
        
        const matchId = req.params.id;
        
        await Match.deleteOne({_id: matchId });
       
        console.log("Match Deleted");
        res.status(200).send("Match Deleted");
        } catch (err) {
       
        console.log("Match not deleted " + err);
        res.status(500).send("Match not deleted " + err); }
    });
    
module.exports = app;