module.exports = (app) => {
    const book = require("../controllers/book.controller");
  
    var router = require("express").Router();
  
    router.post("/createNewBook", book.createNewBook);

    router.get("/find", book.findAll);
  
    app.use("/api/book", router);
  };
  