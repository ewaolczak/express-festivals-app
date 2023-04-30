const express = require('express');
const cors = require('cors');
// const uuid = require('uuid'); // nie potrafię zrobić z tym testu przez Postmana

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  {
    id: 2,
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.'
  }
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

// dlaczego endpoint random musi być przed endpointem :id, żeby działała aplikacja??

app.get('/testimonials/random', (req, res) => {
  res.json(
    db.find((req) => req.id === Math.floor(Math.random() * db.length) + 1)
  );
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.find((testimonial) => testimonial.id === +req.params.id));
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  // const id = uuid(); //Postman wywala błąd
  const id = +req.params.id; // Żeby sprawdzić połączenie, trzeba ręcznie wpisać id
  const newTestimonial = { id: id, author, text };
  db.push(newTestimonial);
  res.json({ message: 'ok!' });
});

app.put(
  '/testimonials/:id',
  (req, res) => {
    const { author, text } = req.body;
    const id = +req.params.id;
    const testimonial = db.find((testimonial) => testimonial.id === id);
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
    db.splice(
      db.findIndex((testimonial) => testimonial.id === id),
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
