
//Dependencies
const express = require("express");
const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");
const database = require("./db/db")

//Set up express app
var app = express();
var PORT = process.env.PORT || 3000;

//Data parsing and lining to public/assets folder
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json);

//Loads with index.html file. First get it and listen
app.get("/", function (req ,res){
    res.sendFile(path.join(__dirname, "/public.index.html"));
});

// Notes html and it's "url"
app.use("/notes", function (req,res){
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

// GET, POST, DELETE API Endpoints.
app.route("/api/notes")
    // Grab the notes list (this should be updated for every new note and deleted note.)
.get(function (req, res){
    res.json(database);
})

//Add notes
.post(function (req,res){
let jsonFilePath = path.join(__dirname, "/db/db.json");
let newNote = req.body;
})

