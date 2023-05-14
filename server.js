const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the React app
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));
app.use((req, res, next) => {
  req.db = db;
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

// connects our backend code with the database
mongoose.connect('/mongodb://localhost:27017/NewWaveDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
