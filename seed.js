const mongoose = require('mongoose');
const bookSchema = require('./mongo-schema');

bookSchema.statics.seed = async function() {

    await Book.create({
      title: "20000 Leagues Under the Sea",
      description: "Captain Nemo does stuff",
      status: "available"
    });

    await Book.create({
      title: "Fourth Wing",
      description: "War...but at SCHOOL",
      status: "unavailable"
    });

    await Book.create({
      title: "Never Split the Difference",
      description: "Money $$$$$$$$$$$",
      status: "checkedOut"
    });
}

bookSchema.statics.clear = async function() {
    try {
        await Book.deleteMany({});
        return "Cleared the database";
    } catch(e) {
        return e.message;
    }
}

const Book = mongoose.model('book', bookSchema);
module.exports = Book;