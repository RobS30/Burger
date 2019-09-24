var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// routes- show all burgers
router.get("/", function(req, res) {
  burger.all(function(data) {
    var burgers = [];
    var devouredBurgers = [];
    for (i = 0; i < data.length; i++) {
      if (data[i].devoured === 1) {
        devouredBurgers.push(data[i]);
      } else {
        burgers.push(data[i]);
      }
    }
    res.render("index", {
      burgers: burgers,
      devouredBurgers: devouredBurgers
    });
  });
});

// route- create a new burger
router.post("/api/burgers", function(req, res) {
  var burgerName = req.body.burgerName;
  var devouredBurgers = req.body.devouredBurgers === "true";
  burger.create(["burgerName", "devoured"], [burgerName, devouredBurgers], function(
    result
  ) {
    res.json({ id: result.insertId });
  });
});

// route- update a burger

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.update(
    {
      devoured: req.body.devoured
    },
    condition,
    function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, the the ID and burger does not exist so it returns a 404 error
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

// route- delete a burger- -still needs work

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, the the ID and burger does not exist so it returns a 404 error
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
