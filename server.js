/*Dependacies*/
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const allNotes = require('./db/db.json');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

 /*HTML ROUTES*/
// GET Route for homepage
/*Shows all not4es*/
app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
})

app.get("/", (req, res) =>
res.sendFile(path.join(__dirname, "/public/index.html"))
);
// // GET Route for notes
app.get("/notes", (req, res) =>
res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// /*Creating a function to create new notes*/
function creatingNotes(body, notes) {
    const newNote = body;
       /*isArray() method to check whether an object (or a variable) is an array or not*/
    if (!Array.isArray(notes))
        notes = [];
    
    if (notes.length === 0)
    // /* The push method appends values to an array ie notes in the instance*/
        notes.push(0);

    body.id = notes[0];
    notes[0]++;

    notes.push(newNote);
         /*creates a new file if the specified file does not exist */
    fs.writeFileSync(
        /*Adds to the db.json file*/
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    return newNote;
}
 /*Posts the notes*/
app.post('/api/notes', (req, res) => {
    const newNote = creatingNotes(req.body, allNotes);
    res.json(newNote);
});

/*Deleting Notes function*/
function deleteNote(id, notes) {
    /*Looping*/
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];

        if (note.id == id) {
            /*The splice() method changes the contents of an array by removing or replacing existing 
            elements and/or adding new elements in place. */
            notes.splice(i, 1);
                    /*Updates it basically once its been removed*/
                 /*creates a new file if the specified file does not exist  and joins it to db.json*/
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notes, null, 2)
            );
            break;
        }
    }
}
/*Delets the property from the array*/
app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});

/*Function is used to bind and listen the connections on the specified host and port */
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});


