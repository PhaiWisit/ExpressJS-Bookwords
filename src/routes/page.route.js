module.exports = (app) => {
    const page = require("../controllers/page.controller");
  
    var router = require("express").Router();
  
    router.post("/createNewWord", page.createNewWord);

    router.get("/find", page.findAll);

    router.get("/find/:book_id/:page_number", page.find);
  
    app.use("/api/page", router);
  };
  