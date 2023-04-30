const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

// dlaczego endpoint random musi być przed endpointem :id, żeby działała aplikacja??

router.route('/testimonials/random').get((req, res) => {
  res.json(
    db.testimonials.find(
      (req) => req.id === Math.floor(Math.random() * db.testimonials.length) + 1
    )
  );
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(
    db.testimonials.find((testimonial) => testimonial.id === +req.params.id)
  );
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  // const id = uuid(); //Postman wywala błąd
  const id = +req.params.id; // Żeby sprawdzić połączenie, trzeba ręcznie wpisać id
  const newTestimonial = { id: id, author, text };
  db.testimonials.push(newTestimonial);
  res.json({ message: 'ok!' });
});

router.route('/testimonials/:id').put(
  (req, res) => {
    const { author, text } = req.body;
    const id = +req.params.id;
    const testimonial = db.testimonials.find(
      (testimonial) => testimonial.id === id
    );
    testimonial.author = author;
    testimonial.text = text;
    res.json({ message: 'OK!' });
  },
  (err) => {
    console.log(err);
  }
);

router.route('/testimonials/:id').delete(
  (req, res) => {
    const id = +req.params.id;
    db.testimonials.splice(
      db.testimonials.findIndex((testimonial) => testimonial.id === id),
      1
    );
    res.json({ message: 'OK!' });
  },
  (err) => {
    console.log(err);
  }
);

module.exports = router;
