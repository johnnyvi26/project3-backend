//////////////////////////////////////////////////////////////
///////////////////////// DEPENDENCIES ///////////////////////
//////////////////////////////////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4000
// pull MONGODB_URL from .env
const { PORT = 4000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");




//////////////////////////////////////////////////////////////
/////////////////////// DATABASE CONNECTION //////////////////
//////////////////////////////////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

//////////////////////////////////////////////////////////////
//////////////////////// MODELS ///////////////////////////////
//////////////////////////////////////////////////////////////
const GameSchema = new mongoose.Schema({
    name: String,
    image: String,
    bio: String,
});

const Game = mongoose.model("Game", GameSchema);

//////////////////////////////////////////////////////////////
///////////////////////// MIDDLEWARE /////////////////////////
//////////////////////////////////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies



//////////////////////////////////////////////////////////////
///////////////////////////////// ROUTES /////////////////////
//////////////////////////////////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("hello world");
});

// PEOPLE INDEX ROUTE
app.get('/games', async (req,res)=>{
    try{
        // send all games
        res.json(await Game.find({}));
    } catch(error){
        // send error
        res.status(4000).json(error);
    }
});

// PEOPLE CREATE ROUTE
app.post('/games', async (req,res)=>{
    try{
        // send all people
        res.json(await Game.create(req.body));
    } catch(error){
        //send error
        res.status(4000).json(error);
    }
});

/// PEOPLE DELETE ROUTE
app.delete('/games/:id', async (req, res)=>{
    try{
        // send all people
        res.json(await Game.findByIdAndRemove(req.params.id));
    } catch(error){
        // send error
        res.status(4000).json(error);
    }
});

// PEOPLE UPDATE ROUTE
app.put('/games/:id', async (req, res)=>{
    try{
        // send all people
        res.json(
            await Game.findByIdAndUpdate(req.params.id, req.body, { new: true})
        );
    } catch(error){
        // send error
        res.status(4000).json(error);
    }
});

//////////////////////////////////////////////////////////////
////////////////////////////LISTENER /////////////////////////
//////////////////////////////////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));