/* eslint-disable no-console */
const express = require('express');
const Trip = require('../models/trip');

const router = express.Router();

router.get('/', (req, res) => {
  Trip.find({ })
    .then((data) => {
      console.log('Data: ', data);
      res.json(data);
    })
    .catch((error) => {
      res.send('Error: ', error);
    });
});

router.post('/', (req, res) => {
  const data = req.body;
  const newTrip = new Trip(data);
  newTrip.save((error) => {
    if (error) {
      console.log(error);
    } else {
      res.status(201).json(newTrip);
    }
  });
});

router.put('/:id', (req, res) => {
  Trip.findByIdAndUpdate({
    _id: req.params.id,
  }, req.body, {
    new: true,
  }, (err, doc) => {
    if (err) console.log(err);
    res.json(doc);
  });
});

router.delete('/:id', (req, res) => {
  Trip.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) console.log(err);
    res.json(doc);
  });
});

module.exports = router;
