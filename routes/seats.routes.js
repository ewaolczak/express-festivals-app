const express = require('express');
const router = express.Router();
const Seat = require('../models/seat.model');

router.get('/seats', async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/seats/:id', async (req, res) => {
  try {
    const singleSeat = await Seat.findById(req.params.id);
    if (!singleSeat) res.status(404).json({ message: 'Not found' });
    else res.json(singleSeat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/seats', async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({
      day: day,
      seat: seat,
      client: client,
      email: email
    });
    await newSeat.save();
    res.json({ message: 'ok!' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/seats/:id', async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const singleSeat = await Seat.findById(req.params.id);
    if (singleSeat) {
      await Seat.updateOne(
        { _id: req.params.id },
        { $set: { day: day, seat: seat, client: client, email: email } }
      );
      res.json({ message: 'OK!' });
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/seats/:id', async (req, res) => {
  try {
    const singleSeat = await Seat.findById(req.params.id);
    if (singleSeat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK!' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
