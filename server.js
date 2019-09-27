'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
let Schema = mongoose.Schema;

var cors = require('cors');

var app = express();

app.use(express.json())
app.use(cors());

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// let DBURL = "mongodb://ghelanijimmy:azkmdg2jg@learnmern-tuphu.gcp.mongodb.net/test?w=majority";
// mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect("mongodb://mongodb+srv://ghelanijimmy:azkmdg2jg@learnmern-tuphu.gcp.mongodb.net/fcc", {useMongoClient: true});

let connection = mongoose.connection;

connection.on('open', ()=>console.log('we are connected'));
connection.on('error', (err)=>console.log('error connection', err))

let Shortner = Schema({
  original_url: String,
  short_url: Number
})

let ShortnerModel = mongoose.model('Shortner', Shortner);

let db = mongoose.connection;

db.on('error', error=>console.log(error));

app.post("/api/shorturl/new", (req, res)=>{
  console.log(req.body.original_url.length)
  let newURL = new ShortnerModel({
    
    original_url: req.body.original_url,
    short_url: Math.floor(Math.random() * req.body.original_url.length) + 5
  })
  
  console.log(newURL)
  newURL.save(err=>{
    if(err) res.json(err)
  })
  res.json({
    original_url: req.body.original_url,
    short_url: Math.floor(Math.random() * req.body.original_url.length) + 5
  })
})





/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});