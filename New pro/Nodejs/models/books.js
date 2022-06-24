const mongoose = require('mongoose');

var books = mongoose.model('books', {
    name: { type: String },
    authur: { type: String },
    year: { type: Number }
});

module.exports = { books };