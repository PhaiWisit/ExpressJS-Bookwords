const Book = require("../models/Book")

exports.createNewBook = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!",
        });
      }
    
      const book = new Book({
        book_name: req.body.book_name,
      });
    
      Book.createNewBook(book, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Book.",
          });
        else res.send(data);
      });
}

exports.findAll = (req, res) => {
  Book.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving book.",
      });
    else res.send(data);
  });
};