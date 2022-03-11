
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

//Add notes - json.db file
 // Add a new note to the json db file.
 .post(function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    let newNote = req.body;

    // This allows the test note to be the original note.
    let highestId = 99;
    // This loops through the array and finds the highest ID.
    for (let i = 0; i < database.length; i++) {
        let individualNote = database[i];

        if (individualNote.id > highestId) {
            // highestId will always be the highest numbered id in the notesArray.
            highestId = individualNote.id;
        }
    }
    // This assigns an ID to the newNote. 
    newNote.id = highestId + 1;
    // We push it to db.json.
    database.push(newNote)

    // Write the db.json file again.
    fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

        if (err) {
            return console.log(err);
        }
        console.log("Your note was saved!");
    });
    // Gives back the response, which is the user's new note. 
    res.json(newNote);
});