'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./seed')
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT || 3000;
const DATABASE_URI = process.env.DATABASE_URI;

mongoose.connect(DATABASE_URI);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (request, response) => {
  response.json({message: 'This is the bookie server'});
});

app.get('/books', handleGetBooks);
app.get('/books/seed', seedDatabase);
app.get('/books/nuke', emptyDatabase);

app.post('/books', handleCreateBooks);
app.delete('/books/:id', handleDeleteBooks);

app.get('*', (request, response) => {
  response.status(404).json({message: 'Not Found'});
});

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({message: 'Internal Server Error'});
});

async function handleCreateBooks(request, response) {
  let book = request.body;
  try {
    let newBook = await Book.create(book);
    response.json(newBook);
  }
  catch(error){
    response.status(500).json({message: error.mesage})
  }
}

async function handleDeleteBooks(request,responese){
try {
  let id = request.params.id;
  let deletedBook= await Book.findByIdAndDelete(id);
  if (!deleteBook) {
    return response.status(404).json({message: "Book not found"});
  }
  response.json({message: "Book delete successfully",deletedBook});
} catch (error) {
  response.status(500).json({message: error.message});
}
}

async function handleGetBooks(request, response) {
  let filterQuery = {};
  const books = await Book.find(filterQuery);
  response.json(books);
}

async function seedDatabase(request, response) {
  let results = await Book.seed();
  response.json({message: results});
}

async function emptyDatabase(request, response) {
  let results = await Book.clear();
  response.json({message: results});
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));