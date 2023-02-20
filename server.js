//importing package
const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const formidable = require('formidable');
//declare static path
let staticPath = path.join(__dirname, "Public");
//intializing express.js
const app = express();

//middlewares
app.use(express.static(staticPath));
app.use(express.json());

//routes

//home route
app.get('/', (req,res) =>{
    res.sendFile(path.join(staticPath, "index.html"));
})

app.listen(2005, () =>{
    console.log("listening on port 2005.......")
})