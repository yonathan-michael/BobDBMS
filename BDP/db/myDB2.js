// my db back up

var sqlite3 = require("sqlite3").verbose();
const util = require("util");

function myDB2() {
  const myDB2 = {};

  // Locations

  myDB2.getLocations = function (res) {
    const db = new sqlite3.Database("./db/BDP.db");

    db.all(`SELECT * FROM Locations;`, (err, rows) => {
      if (err) {
        console.log("error", err);
        res.render("locations", { err: err.message, locations: [] });
        return;
      }
      res.render("locations", { locations: rows });
    });

    db.close();
  };

  // LocationDonuts

  myDB2.getLocationDonuts = function (res) {
    const db = new sqlite3.Database("./db/BDP.db");

    db.all(
      `SELECT AddressDonut.Address, donuts.Name
FROM (SELECT Locations.Address, LocationDonuts.DonutID
FROM Locations
INNER JOIN LocationDonuts
ON LocationDonuts.LocationID = Locations.LocationID
ORDER BY Locations.Address) as AddressDonut
LEFT JOIN donuts
ON donuts.DonutID = AddressDonut.DonutID;`,
      (err, rows) => {
        if (err) {
          console.log("error", err);
          res.render("LocationDonuts", {
            err: err.message,
            locationDonuts: [],
          });
          return;
        }
        res.render("LocationDonuts", { locationDonuts: rows });
      }
    );

    db.close();
  };

  // Donuts

  myDB2.getDonuts = function (res) {
    const db = new sqlite3.Database("./db/BDP.db");

    db.all(`SELECT * FROM donuts;`, (err, rows) => {
      if (err) {
        console.log("error", err);
        res.render("donuts", { err: err.message, donuts: [] });
        return;
      }
      res.render("donuts", { donuts: rows });
    });

    db.close();
  };

  // Employees

  myDB2.getEmployees = function (res) {
    const db = new sqlite3.Database("./db/BDP.db");

    db.all(`SELECT * FROM employees;`, (err, rows) => {
      if (err) {
        console.log("error", err);
        res.render("employees", { err: err.message, employees: [] });
        return;
      }
      res.render("employees", { employees: rows });
    });

    db.close();
  };

  // Sales

  myDB2.getSales = function (res) {
    const db = new sqlite3.Database("./db/BDP.db");

    db.all(`SELECT * FROM sales ORDER BY sales.SaleDate;`, (err, rows) => {
      if (err) {
        console.log("error", err);
        res.render("sales", { err: err.message, sales: [] });
        return;
      }
      res.render("sales", { sales: rows });
    });

    db.close();
  };

  return myDB2;
}

module.exports = myDB2();
