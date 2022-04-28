const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/my_contact_list_db");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connecting to db"));

db.once("open", () => {
  console.log("successfully connected to the db");
});
