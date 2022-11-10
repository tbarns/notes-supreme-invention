const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/db.json');


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.get('/api/notes', (req, res) => {
  const savedNotes = db
  fs.readFileSync(path.join(__dirname, './db/db.json'), 'UTF8', JSON.stringify(savedNotes))
  res.json(savedNotes)

})

app.post('/api/notes', (req, res) => {
  const savedNotes = db
  const newNote = { title: req.body.title, text: req.body.text, id: uuid() }
  savedNotes.push(newNote)
  console.log(savedNotes)
  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(savedNotes))
  res.json(savedNotes)
})


//selects a note from the param of the UUID that has
app.delete('/api/notes/:id', (req, res) => {
  const savedNotes = db
  const dbNotes = savedNotes.filter(note => note.id !== req.params.id)
  console.log(dbNotes)


  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(dbNotes))
  res.json(dbNotes)
})


//access the public folder to read the notes HTML
app.get('/notes', (req, res) => {
  // Send a message to the client
  res.sendFile(path.join(__dirname, './public/notes.html'));

});
app.get('*', (req, res) => {
  // Send a message to the client
  res.sendFile(path.join(__dirname, './public/notes.html'));

});

// listening for requests
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);