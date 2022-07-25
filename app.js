const express = require("express");
const cors = require("cors");
const con = require("./src/configs/connection");
const dbConfig = require("./src/configs/db.config");
const log = require("./src/utils/log.colors");

const PORT = process.env.PORT || 5002;

const app = express();

var corsOptions = {
  // origin: "http://localhost:8081"
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ 
    status:"ok",
    message: "This is simple route." });
});

require("./src/routes/book.route")(app);
require("./src/routes/page.route")(app);

app.listen(PORT, () => {
  console.log(log.Cyan, `Running at port ${PORT}`);
  con.connect(function (err) {
    if (err) {
      console.log(log.Red, `Error: Cannot connect to database. ${dbConfig.DB} ${err}` );
      return;
    }
    console.log(log.Yellow, `Connect to database : ${dbConfig.DB}`);
  });
});
