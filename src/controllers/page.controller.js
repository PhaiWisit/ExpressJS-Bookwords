const Page = require("../models/Page")

exports.createNewWord = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!",
        });
      }
    
      const page = new Page({
        book_id: req.body.book_id,
        page_number: req.body.page_number,
        page_word: req.body.page_word
      });
    
      Page.createNewWord(page, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Word.",
          });
        else res.send(data);
      });
}

exports.findAll = (req, res) => {
  Page.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving page.",
      });
    else res.send(data);
  });
};

exports.find = (req, res) => {
  Page.find(req.params.book_id,req.params.page_number, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Test with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Test with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};