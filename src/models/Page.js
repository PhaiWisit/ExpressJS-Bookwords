const con = require("../configs/connection");

const Page = function (page) {
  this.page_id = page.page_id;
  this.book_id = page.book_id;
  this.page_number = page.page_number;
  this.page_word = page.page_word;
}

Page.createNewWord = (newPage, result) => {
  con.query("INSERT INTO pages SET ?", newPage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Word: ", { id: res.insertId, ...newPage });
    result(null, { id: res.insertId, ...newPage });
  });
}

Page.findAll = (result) => {
  let query = "SELECT * FROM pages";
  con.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("page : ", res);
    result(null, res);
  });
};

Page.find = (book_id , page_number , result) => {
  con.query(`SELECT * FROM pages WHERE book_id = ${book_id} AND page_number = ${page_number}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      // console.log("found test: ", res[0]);

      var lines = res[0].page_word.split(/\r?\n/);
      

      var resultStr = "";

      for(let i=0 ; i < lines.length ;i++){
        resultStr = resultStr + lines[i] + '<br/>'
      }
      console.log(resultStr);

      result(null, resultStr);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};


module.exports = Page;