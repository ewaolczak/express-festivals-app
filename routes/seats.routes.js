const express = require('express');
const router = express.Router();
const uuid = require('uuid').v4;
const db = require('./../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find((seat) => seat.id === +req.params.id));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuid();
  const newSeat = { id: id, day, seat, client, email };
  if (
    db.seats.some(
      (seatCheck) =>
        seatCheck.day === newSeat.day && seatCheck.seat === newSeat.seat
    )
  ) {
    res.json({ message: 'The slot is already taken...' });
    res.status(409).json({ message: 'The slot is already taken...' });
  } else {
    db.seats.push(newSeat);
    res.json({ message: 'ok!' });
  }
});

router.route('/seats/:id').put(
  (req, res) => {
    const { day, seat, client, email } = req.body;
    const id = +req.params.id;
    const seatChange = db.seats.find((seat) => seat.id === id);
    seatChange.day = day;
    seatChange.seat = seat;
    seatChange.client = client;
    seatChange.email - email;
    res.json({ message: 'OK!' });
  },
  (err) => {
    console.log(err);
  }
);

router.route('/seats/:id').delete(
  (req, res) => {
    const id = +req.params.id;
    db.seats.splice(
      db.seats.findIndex((seat) => seat.id === id),
      1
    );
    res.json({ message: 'OK!' });
  },
  (err) => {
    console.log(err);
  }
);

module.exports = router;
