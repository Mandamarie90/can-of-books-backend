'use strict';

const mongoose = require('mongoose');
const bookModel = require('./seed')
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const DATABASE_URI = process.env.DATABASE_URI;

mongoose.connect(DATABASE_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (request, resonse) => {
  response.json({message: 'This is the bookie server'});
});

app.get('/books', handleGetBooks);
app.get('/books/seed', seedDatabase);
app.get('/books/nuke', emptyDatabase);


app.get('*', (request, response) => {
  response.status(404).json({message: 'Not Found'});
});

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({message: 'Internal Server Error'});
});

async function handleGetBooks(request, response) {
  let filterQuery = {};
  const books = await bookModel.find(filterQuery);
  response.json(books);
}

async function seedDatabase(request, response) {
  let results = await bookModel.seed();
  response.json({message: results});
}

async function emptyDatabase(request, response) {
  let results = await bookModel.clear();
  response.json({message: results});
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
