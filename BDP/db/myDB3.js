const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");

const dbName = "./db/BDP.db";

function MyDB3() {
  const myDb3 = {};

  async function insertDonut(Name, Price) {
    console.log(Name, Price);

    const db = new sqlite3.Database(dbName);

    const query = `INSERT INTO donuts(Name, Price)
  VALUES ($Name, $Price)
`;

    return new Promise((resolve, reject) => {
      db.run(query, Name, Price, function (err) {
        if (err) {
          return reject(err);
        }
        console.log("promise", this);
        resolve(this.lastID);
      });
    }).finally(() => db.close());
  }

  async function getDonuts(res) {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = `SELECT * FROM donuts;`;

    const promise = promisify(db.all.bind(db));

    return promise(query).finally(() => db.close());
  }

  async function DeleteDonut(DonutID) {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = `DELETE FROM donuts WHERE DonutID = $DonutID;`;

    const promise = promisify(db.run.bind(db));

    return promise(query, DonutID).finally(() => db.close());
  }

  async function UpdateDonut(DonutID, Name, Price) {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = `UPDATE donuts SET DonutID = $DonutID, Name = $Name, Price = $Price WHERE DonutID = $DonutID;`;

    console.log(query);

    console.log("updated");

    const promise = promisify(db.run.bind(db));

    return promise(query, DonutID, Name, Price).finally(() => db.close());
  }

  myDb3.insertDonut = insertDonut;
  myDb3.getDonuts = getDonuts;
  myDb3.DeleteDonut = DeleteDonut;
  myDb3.UpdateDonut = UpdateDonut;

  return myDb3;
}

module.exports = MyDB3();
