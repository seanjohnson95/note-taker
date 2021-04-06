const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

//get notes
router.get("/notes", (req, res) => {
  return res.json(db);
});
//create
router.post("/notes", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../../db/db.json"),
    "utf8",
    function (err, data) {
      if (err) {
        throw err;
      }
      var db = JSON.parse(data);
      var newNotes = { ...req.body, id: uuidv4() };
      var updatedNotes = [newNotes, ...db];
      try {
        fs.writeFile(
          path.join(__dirname, "../../db/db.json"), JSON.stringify(updatedNotes),
          function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log('successfully added')
              res.json(true);
            }
          }
        );
      } catch (err) {
        res.json(err);
      }
    }
  );
});


module.exports = router;