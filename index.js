const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

MongoClient.connect(url)
  .then((client) => {
    //assert.equal(err, null);
    console.log("\nConnected correctly to the server\n");
    const db = client.db(dbname);
    dboper
      .insertDocument(db, { name: "Vadonut", description: "test" }, "dishes")
      .then((result) => {
        console.log("\nInsert Document:\n", result.ops);
        return dboper.findDocuments(db, "dishes");
      })
      .then((docs) => {
        console.log("\nFound Documents:\n", docs);
        return dboper.updateDocument(
          db,
          { name: "Vadonut" },
          { description: "Updated test" },
          "dishes"
        );
      })
      .then((result) => {
        console.log("\nUpdated Document:\n", result.result);
        return dboper.findDocuments(db, "dishes");
      })
      .then((docs) => {
        console.log("\nFound Updated Documents:\n", docs);
        return db.dropCollection("dishes");
      })
      .then((result) => {
        console.log("\nDropped Collection: ", result);
        return client.close();
      })
      .catch((err) => console.log(err));

    //   const collection = db.collection("dishes");

    //   collection.insertOne(
    //     { name: "Uthappizza", description: "test" },
    //     (err, result) => {
    //       assert.equal(err, null);

    //       console.log("After Insert: \n");
    //       console.log(result.ops);

    //       collection.find({}).toArray((err, docs) => {
    //         assert.equal(err, null);

    //         console.log("Found:\n");
    //         console.log(docs);

    //         db.dropCollection("dishes", (err, result) => {
    //           assert.equal(err, null);

    //           client.close();
    //         });
    //       });
    //     }
    //   );
  })
  .catch((err) => console.log(err));
