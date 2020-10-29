// index back up

const express = require("express");
const router = express.Router();

const myDB = require("../db/myDB2.js");

/* GET  */

/* List of Locations */
router.get("/locations", (req, res) => {
  myDB.getLocations(res);
});

/* List of Location and Available Donuts */
router.get("/locationdonuts", (req, res) => {
  myDB.getLocationDonuts(res);
});

/* List of Donut Flavors */
router.get("/donuts", (req, res) => {
  myDB.getDonuts(res);
});

/* List of Employees */
router.get("/employees", (req, res) => {
  myDB.getEmployees(res);
});

/* List of All Sales */
router.get("/sales", (req, res) => {
  myDB.getSales(res);
});

module.exports = router;
