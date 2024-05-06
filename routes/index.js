var express = require('express');
var router = express.Router();
var Coordinate = require('../Models/models').register;
const fs = require("fs");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/coordinates', function(req, res, next) {
  // Extract latitude and longitude from the request body
  const { latitude, longitude } = req.body;

  // Check if a coordinate with the same latitude and longitude exists
  Coordinate.findOne({ latitude: latitude, longitude: longitude })
    .then(existingCoordinate => {
      if (existingCoordinate) {
        // If a coordinate with the same latitude and longitude exists, discard it
        console.log('Duplicate coordinate discarded:', existingCoordinate);
        return res.status(200).json({ message: 'Duplicate coordinate discarded' });
      } else {
        // Create a new coordinate object
        const coordinate = new Coordinate({
          latitude: latitude,
          longitude: longitude
        });

        // Save the coordinate to the database
        coordinate.save()
          .then(savedCoordinate => {
            console.log('Coordinate saved:', savedCoordinate);

            // Write the GeoJSON string to a file
            const geoJSONString = JSON.stringify({
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
              }
            });

            fs.appendFile('coordinates.geojson', geoJSONString + ',\n', (err) => {
              if (err) {
                console.error('Error writing to file:', err);
              }
              console.log('Coordinates written to file successfully');
            });

            res.status(201).json(savedCoordinate);
          })
          .catch(error => {
            console.error('Error saving coordinate:', error);
            res.status(500).json({ error: 'Error saving coordinate' });
          });
      }
    })
    .catch(error => {
      console.error('Error finding existing coordinate:', error);
      res.status(500).json({ error: 'Error finding existing coordinate' });
    });
});

module.exports = router;
