const mongoose = require('mongoose');
const bookSchema = require('./mongo-schema');

bookSchema.statics.seed = async function() {
  try {
    await book.create({
      title: "20000 Leagues Under the Sea",
      description: "Captain Nemo does stuff",
      status: "Available"
    });

    await book.create({
      title: "Fourth Wing",
      description: "War...but at SCHOOL",
      status: "Unavailable"
    });

    await book.create({
      title: "Never Split the Difference",
      description: "Money $$$$$$$$$$$",
      status: "checkedOut"
    });

    console.log("seeded database with 3 books");
  } catch (error) {
    console.log("UGH")
  }
}

bookSchema.statics.clear = async function() {
    try {
        await book.deleteMany({});
        return "Cleared the database";
    } catch(e) {
        return e.message;
    }
}


const book = mongoose.model('book', bookSchema);

module.exports = book;
