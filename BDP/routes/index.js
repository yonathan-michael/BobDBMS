var express = require("express");
var router = express.Router();

const myDB = require("../db/myDB.js");

/* Home Page */
router.get("/", function (req, res, next) {
  res.render("home", { title: "Welcome to Bob's Donuts and Pastries" });
});

router.get("/deliveryservices", async (req, res, next) => {
  try {
    const deliveryservices = await myDB.getDeliveryServices();

    res.render("delivery_service", {
      deliveryservices: deliveryservices,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/deliveryservices/create", async (req, res, next) => {
  try {
    const delivery_service = req.body;
    console.log("create delivery service", delivery_service);

    const deliveryId = await myDB.insertDeliveryService(delivery_service);
    console.log("inserted id", deliveryId);

    res.redirect("/deliveryservices");
  } catch (err) {
    next(err);
  }
});

router.post("/deliveryservices/delete", async (req, res, next) => {
  try {
    const delivery_service = req.body;
    console.log("delete delivery service", delivery_service);
    const deliveryID = await myDB.DeleteDeliveryService(delivery_service);

    res.redirect("/deliveryservices");
  } catch (err) {
    next(err);
  }
});

router.post("/deliveryservices/update", async (req, res, next) => {
  try {
    console.log(req.body["$DeliveryID"]);
    console.log(req.body["$CompanyName"]);

    const delivery_serviceID = req.body["$DeliveryID"];
    const companyName = req.body["$CompanyName"];

    console.log("updating", req.body);
    const deliveryID = await myDB.UpdateDeliveryService(
      delivery_serviceID,
      companyName
    );

    res.redirect("/deliveryservices");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
