let express = require('express');
let Player = require('../Models/playerModel');
let multer = require('multer');
let path = require('path');
let { v4: uuidv4 } = require('uuid');
let app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Support URL-encoded bodies for multipart forms


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Images');  // Directory where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let upload = multer({ storage, fileFilter });


const checkForDuplicatePlayer = async (shirtNumber, name, surname, image) => {
    const playerByNumber = await Player.findOne({ shirtNumber });
    if (playerByNumber) {
        return { error: 'Player with this shirt number already exists.' };
    }

    const playerByImage = await Player.findOne({ image });
    if (playerByImage) {
        return { error: 'Player with this image already exists.' };
    }

    const player = await Player.findOne({ name, surname });
    if (player) {
        return { error: 'Player with this name and surname already exists.' };
    }

    return { error: null };
};


app.post("/addPlayer", upload.single('image'), async (req, res) => {
    try {
        const { name, surname, shirtNumber, position, foot } = req.body;
        const image = req.file.filename;

        const duplicateCheck = await checkForDuplicatePlayer(shirtNumber, name, surname, image);
        if (duplicateCheck.error) {
            return res.status(400).send(duplicateCheck.error);
        }


        let newPlayer = new Player({
            name,
            surname,
            shirtNumber,
            position,
            foot,
            image: req.file.filename  // File uploaded is stored as the filename
        });

        await newPlayer.save();
        res.status(200).send("Player added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding player");
    }
});


app.get("/getAllPlayers", async (req, res) => {
    try {
        let players = await Player.find({});
        res.status(200).json(players);  // Respond with all players
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching players");
    }
});


app.get("/getOnePlayer/:id", async (req, res) => {
    try {
        const playerId = req.params.id;
        let player = await Player.findById(playerId);
        if (!player) {
            return res.status(404).send("Player not found");
        }
        res.status(200).json(player);
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error fetching player with ID: ${req.params.id}`);
    }
});


app.patch("/update/:id", upload.single('image'), async (req, res) => {
    try {
        const playerId = req.params.id;
        const updateData = { ...req.body };


        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedPlayer = await Player.findByIdAndUpdate(playerId, updateData, { new: true });
        if (!updatedPlayer) {
            return res.status(404).send("Player not found");
        }

        res.status(200).json(updatedPlayer);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating player");
    }
});


app.delete("/deletePlayer/:id", async (req, res) => {
    try {
        const playerId = req.params.id;
        const deletedPlayer = await Player.findByIdAndDelete(playerId);

        if (!deletedPlayer) {
            return res.status(404).send("Player not found");
        }

        res.status(200).send("Player deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting player");
    }
});

module.exports = app;
