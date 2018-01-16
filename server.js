const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))

var db

MongoClient.connect('mongodb://localhost:27017/node', (err, database) => {
  if (err) return console.log(err)
  db = database.db("node")
  app.listen(3000, () => {
    console.log('listening on 3000')
  })	
})


app.get('/', (req, res) => {
  res.sendFile( __dirname + '/index.html')
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})