const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const { Quiz } = require("./schemas/seedHelper");

mongoose.connect('mongodb://localhost:27017/QuizData')
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(8080, () => {
      console.log('Server is running on port 8080');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Set up EJS as the view engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Set the views directory
app.use(express.static('public')); // to serve CSS, JS, images, etc.





app.use(bodyParser.json());
app.get('/', (req, res) => {
  console.log('home');
  res.render('home');
});

app.get('/quiz', async (req, res) => {
  try {

    const questions = await Quiz.find();

    res.render('quiz', { questions });
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).send('Error fetching questions');
  }
});
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; script-src 'self' 'unsafe-inline';"
  );
  next();
});
