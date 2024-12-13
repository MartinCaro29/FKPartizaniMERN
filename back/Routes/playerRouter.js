let express = require('express');
let Player = require('../Models/playerModel');
let multer = require('multer');
let path=require('path');
let {v4: uuidv4} = require('uuid');
let app = express();
app.use(express.json());




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'Images');
    },
    filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
    })
    const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
    } else {
    cb(null, false)
    }}
    let upload = multer({ storage, fileFilter })

   app.post("/addPlayer", upload.single('image'), async(req,res) =>{
    try{
        let newPlayer = new Player({
            ...req.body,
            image: req.file.filename
        });
        await newPlayer.save();

        res.status(200).send("Add")
    }
    catch(err){
        res.status(500).send("Player not added");
    }


   }); 

   app.get("/getAllPlayers", async(req,res) =>{
    try{
        let players = await Player.find({});
        res.status(200).send("Get")
    }
    catch(err){
        res.status(500).send("Error reading players")
    }
   });

   app.get("/getOnePlayer/:id", async(req,res) =>{
    try{
        const playerId = req.params.id;
        let players = await Player.findById({_id: playerId});
        res.status(200).send("Get "+playerId)
    }
    catch(err){
        res.status(500).send("Error reading player "+playerId)
    }
   });


   
app.patch("/update/:id", upload.single('image'), async (req, res) => {
    try {
   
    const itemId = req.params.id;
    
    const itemInfo = {...req.body};
    
    if (req.file) {
    itemInfo.image = req.file.filename;
    }
    const itemUpdated = await itemModel.findByIdAndUpdate(
    {_id: itemId},
    {$set: itemInfo},
    {new: true}
    );
    console.log("Data update" + itemUpdated);
    res.status(200).send(itemUpdated);
    } catch (err) {
    console.log("Item not updated " + err);
    res.status(500).send("Item not updated " + err);
    }
    });

   
    app.delete("/delete/:id", async (req, res) => {
    try {
    const itemId = req.params.id;
    await itemModel.deleteOne({_id: itemId });
    console.log("Item Deleted");
    res.status(200).send("Item Deleted");
    } catch (err) {
    
    console.log("Item not deleted " + err);
    res.status(500).send("Item not deleted " + err); }
    });


module.exports = app;