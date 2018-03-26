var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//configure app for bodyParser
//lets us grab data from body of post
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//set up server port
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/codealong');

//API Routes
var router = express.Router();

//Routes will all be prefixed with API
app.use('/api', router);

//TEST
router.get('/', function(req, res){
  res.json({message: "welcome to our api"});
});

//start server
app.listen(port);
console.log("listening on port " + port);
