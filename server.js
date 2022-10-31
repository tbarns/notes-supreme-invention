const express = require('express');
const path = require('path');

const { dirname } = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
// const api = require

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,'public')));

app.get('/notes', (req, res)=>{
  res.sendFile(path.join)(__dirname,'/public/notes.html', 'index.html')
})

// app.get("*",(req, res)=>{
//   res.sendFile(path.join(__dirname, "/public/notes.html"))
// })

// app.get('/api/notes', (req,res) => {
//   res.json(JSON.parse(data))
// })


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);