const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');
const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);

const { dirname } = require('path');
const { json } = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// const api = require("public/assets/js/index.js")

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,'public')));
// app.use('/api', api);

app.get('api/notes', (req, res)=>{
  res.sendFile(path.join)(__dirname, './public/notes.html')
});

app.get('/api/notes', (req, res) => {
  // Send a message to the client
  res.status(200).json(`${req.method} successful  request received to get notes`);
  res.status(404).json(`${req.method} failed request received to get notes`);
  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);
});


app.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//GET Route for a specific note
app.get('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json', json)
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

// app.use((req, res) => {
//   res.status(404).end();
// });


// app.get("*",(req, res)=>{
//   res.sendFile(path.join(__dirname, "/public/notes.html"))
// })

// app.get('/api/notes', (req,res) => {
//   res.json(JSON.parse(data))
// })


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);