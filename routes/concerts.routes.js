const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find((concert) => concert.id === +req.params.id));
});

router.route('/concerts').post((req, res) => {
  const { author, text } = req.body;
  // const id = uuid(); //Postman wywala błąd
  const id = +req.params.id; // Żeby sprawdzić połączenie, trzeba ręcznie wpisać id
  const newconcert = { id: id, author, text };
  db.concerts.push(newconcert);
  res.json({ message: 'ok!' });
});

router.route('/concerts/:id').put(
  (req, res) => {
    const { author, text } = req.body;
    const id = +req.params.id;
    const concert = db.concerts.find((concert) => concert.id === id);
    concert.author = author;
    concert.text = text;
    res.json({ message: 'OK!' });
  },
  (err) => {
    console.log(err);
  }
);

router.route('/concerts/:id').delete(
  (req, res) => {
    const id = +req.params.id;
    db.concerts.splice(
      db.concerts.findIndex((concert) => concert.id === id),
      1
    );
    res.json({ message: 'OK!' });
  },
  (err) => {
    console.log(err);
  }
);

module.exports = router;
