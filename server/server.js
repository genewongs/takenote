const express = require('express');
const db = require('./db.js');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});``

app.get('/api/notes', (req, res) => {
  let sql = 'SELECT * from notes';
  db.query(sql, (err, results) => {
    if(err) {
      console.log(err);
      return;
    }
    res.send(results);
  })
});

app.post('/api/notes', (req,res) => {
  let data = req.body;
  let sql = 'INSERT INTO notes (category, note, status, tagline, title) VALUES(?, ?, ?, ?, ?)';
  let params = [data.category, data.note, data.status, data.tagline, data.title];
  db.query(sql, params, (err, results) => {
    if(err) {
      console.log(err);
      return;
    }
    res.send(results);
  })
});

app.patch('/api/notes', (req, res) => {
  let data = req.body;
  let sql = `UPDATE notes SET status='${data.status}' WHERE title='${data.title}'`;
  db.query(sql, (err,results) => {
    if(err) {
      console.log(err);
      return;
    }
    res.send(results);
  });
})