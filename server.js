var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Vehicle = require('./App/models/vehicles');
//******************************************************************
//configure app for bodyParser
//lets us grab data from body of post
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//set up server port
var port = process.env.PORT || 3000;
//connection
mongoose.connect('mongodb://localhost:27017/codealong');
//*******************************************************************
//Middleware
//can be useful for doing validations
//we can log things in the event that the request is not safe
//middleware to use for all routes
var router = express.Router();
router.use(function(req, res, next) {
  console.log("A request has been made to the server");
  next();
});
// ----------------------
//API Routes
//Routes will all be prefixed with API
app.use('/api', router);
//TEST
router.get('/', function(req, res) {
  res.json({message: "welcome to our api"});
});

//vehicle route------------------
router.route('/vehicles').post(function(req, res) {
  var vehicle = new Vehicle(); //new instance of vehicle schema
  vehicle.make = req.body.make;
  vehicle.model = req.body.model;
  vehicle.color = req.body.color;

  vehicle.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json({message: "Vehicle was successfully manufactured"});
    }
  });
}).get(function(req, res) {
  Vehicle.find(function(err, vehicles) {
    if (err) {
      res.send(err);
    } else {
      res.json({vehicles});
    }
  })
})
//end of vehicle route-------------
//parameter routes by id-----------
//**1)**
router.route('vehicles/:vehicle_id')
  .get(function(req, res){
    Vehicle.findById(req.params.vehicle_id, function(err, vehicle){
      if(err){
        res.send(err);
      }
      res.json(vehicle);
    });
  });
//**2)**
router.route('vehicle/:make').get(function(req, res) {
  Vehicle.find({
    make: req.params.make
  }, function(err, vehicle) {
    if (err) {
      res.send(err);
    } else {
      res.json(vehicle);
    }
  });
})
//**3)**
router.route('vehicle/:color').get(function(req, res) {
  Vehicle.find({
    color: req.params.color
  }, function(err, vehicle) {
    if (err) {
      res.send(err)
    } else {
      res.json(vehicle);
    }
  })
})

//******************************************************************

//start server
app.listen(port);
console.log("listening on port " + port);
