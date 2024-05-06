var express = require('express');
var router = express.Router();
var Coordinate = require('../Models/models').register;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/coordinates', function(req, res, next) {
  // Extract latitude and longitude from the request body
  const { latitude, longitude } = req.body;

  // Create a new coordinate object
  const coordinate = new Coordinate({
    latitude: latitude,
    longitude: longitude
  });

  // Save the coordinate to the database
  coordinate.save()
    .then(savedCoordinate => {
      console.log('Coordinate saved:', savedCoordinate);
      res.status(201).json(savedCoordinate);
    })
    .catch(error => {
      console.error('Error saving coordinate:', error);
      res.status(500).json({ error: 'Error saving coordinate' });
    });
});

module.exports = router;
