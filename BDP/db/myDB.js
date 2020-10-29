const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");

const dbName = "./db/BDP.db";

function MyDB() {
  const myDb = {};

  async function insertDeliveryService(delivery_service) {
    const db = new sqlite3.Database(dbName);

    const query = `INSERT INTO delivery_service(CompanyName)
  VALUES ($CompanyName)
`;

    // const promise = promisify(db.run.bind(db));

    return new Promise((resolve, reject) => {
      db.run(query, delivery_service, function (err) {
        if (err) {
          return reject(err);
        }
        console.log("promise", this);
        resolve(this.lastID);
      });
    }).finally(() => db.close());

    // return promise(query, car)
    //   .then(function (res) {
    //     console.log("Inserted", res, this, db.lastInsertRowId);
    //     return db.lastInsertRowId;
    //   })
    //   .finally(() => db.close());
  }

  async function getDeliveryServices(res) {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = `SELECT * FROM delivery_service;`;

    const promise = promisify(db.all.bind(db));

    return promise(query).finally(() => db.close());
  }

  async function DeleteDeliveryService(DeliveryID) {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = `DELETE FROM delivery_service WHERE DeliveryID = $DeliveryID;`;

    const promise = promisify(db.run.bind(db));

    return promise(query, DeliveryID).finally(() => db.close());
  }

  myDb.insertDeliveryService = insertDeliveryService;
  myDb.getDeliveryServices = getDeliveryServices;
  myDb.DeleteDeliveryService = DeleteDeliveryService;

  return myDb;
}

module.exports = MyDB();
