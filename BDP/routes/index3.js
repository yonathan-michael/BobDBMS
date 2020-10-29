var express = require("express");
var router = express.Router();

const myDB3 = require("../db/myDB3.js");

router.get("/donuts", async (req, res, next) => {
  try {
    const donuts = await myDB3.getDonuts();

    res.render("donuts", {
      donuts: donuts,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/donuts/create", async (req, res, next) => {
  try {
    const Name = req.body["$Name"];
    const Price = req.body["$Price"];

    console.log("create donut", Name);

    const dId = await myDB3.insertDonut(Name, Price);
    console.log("inserted id", dId);

    res.redirect("/donuts");
  } catch (err) {
    next(err);
  }
});

router.post("/donuts/delete", async (req, res, next) => {
  try {
    const donut = req.body;
    console.log("delete donut", donut);
    const dID = await myDB3.DeleteDonut(donut);

    res.redirect("/donuts");
  } catch (err) {
    next(err);
  }
});

router.post("/donuts/update", async (req, res, next) => {
  try {
    console.log(req.body["$DonutID"]);
    console.log(req.body["$Name"]);
    console.log(req.body["$Price"]);

    const donutID = req.body["$DonutID"];
    const Name = req.body["$Name"];
    const Price = req.body["$Price"];

    console.log("updating", req.body);
    const dID = await myDB3.UpdateDonut(donutID, Name, Price);

    res.redirect("/donuts");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
