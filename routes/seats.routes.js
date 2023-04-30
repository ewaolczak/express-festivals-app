const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find((seat) => seat.id === +req.params.id));
});

router.route('/seats').post((req, res) => {
  const { author, text } = req.body;
  // const id = uuid(); //Postman wywala błąd
  const id = +req.params.id; // Żeby sprawdzić połączenie, trzeba ręcznie wpisać id
  const newseat = { id: id, author, text };
  db.seats.push(newseat);
  res.json({ message: 'ok!' });
});

router.route('/seats/:id').put(
  (req, res) => {
    const { author, text } = req.body;
    const id = +req.params.id;
    const seat = db.seats.find((seat) => seat.id === id);
    seat.author = author;
    seat.text = text;
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
