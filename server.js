const express = require('express');
const cors = require('cors');
// const uuid = require('uuid'); // nie potrafię zrobić z tym testu przez Postmana

// import db
const db = require('./db.js');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

// dlaczego endpoint random musi być przed endpointem :id, żeby działała aplikacja??

app.get('/testimonials/random', (req, res) => {
  res.json(
    db.testimonials.find(
      (req) => req.id === Math.floor(Math.random() * db.testimonials.length) + 1
    )
  );
});

app.get('/testimonials/:id', (req, res) => {
  res.json(
    db.testimonials.find((testimonial) => testimonial.id === +req.params.id)
  );
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  // const id = uuid(); //Postman wywala błąd
  const id = +req.params.id; // Żeby sprawdzić połączenie, trzeba ręcznie wpisać id
  const newTestimonial = { id: id, author, text };
  db.testimonials.push(newTestimonial);
  res.json({ message: 'ok!' });
});

app.put(
  '/testimonials/:id',
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

app.delete(
  '/testimonials/:id',
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

app.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
  res.json(db.concerts.find((concert) => concert.id === +req.params.id));
});

app.post('/concerts', (req, res) => {
  const { author, text } = req.body;
  // const id = uuid(); //Postman wywala błąd
  const id = +req.params.id; // Żeby sprawdzić połączenie, trzeba ręcznie wpisać id
  const newconcert = { id: id, author, text };
  db.concerts.push(newconcert);
  res.json({ message: 'ok!' });
});

app.put(
  '/concerts/:id',
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

app.delete(
  '/concerts/:id',
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

app.get('/seats', (req, res) => {
  res.json(db.seats);
});

app.get('/seats/:id', (req, res) => {
  res.json(db.seats.find((seat) => seat.id === +req.params.id));
});

app.post('/seats', (req, res) => {
  const { author, text } = req.body;
  // const id = uuid(); //Postman wywala błąd
  const id = +req.params.id; // Żeby sprawdzić połączenie, trzeba ręcznie wpisać id
  const newseat = { id: id, author, text };
  db.seats.push(newseat);
  res.json({ message: 'ok!' });
});

app.put(
  '/seats/:id',
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

app.delete(
  '/seats/:id',
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

app.use((req, res) => {
  res.status(404).send('404 not found...');
});
