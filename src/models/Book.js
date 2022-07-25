const con = require("../configs/connection");

const Book = function (book) {
  this.book_id = book.book_id;
  this.book_name = book.book_name;
}

Book.createNewBook = (newBook, result) => {
  con.query("INSERT INTO books SET ?", newBook, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Book: ", { id: res.insertId, ...newBook });
    result(null, { id: res.insertId, ...newBook });
  });
}

Book.findAll = (result) => {
  let query = "SELECT * FROM books";
  con.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("book : ", res);
    result(null, res);
  });
};


module.exports = Book;