const express = require("express");
const path = require("path"); /* this is for setting ejs in the server*/
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();
app.set("view engine", "ejs"); /* here setting view engine as ejs*/
app.set(
  "views",
  path.join(__dirname, "views")
); /* declaring path to ejs/views folder */

// using middleware to read the data from frontend
app.use(express.urlencoded());

// using middleware to get staric files from assets folder like css and some other frontend js files
app.use(express.static("assets"));

// let contactList = [
//   {
//     name: "shubham",
//     phone: "9639561693",
//   },
//   {
//     name: "pikachu",
//     phone: "895623021",
//   },
// ];

app.get("/", (req, res) => {
  Contact.find({}, (err, contacts) => {
    if (err) {
      console.log("error in fetching contacts");
      return;
    }
    return res.render("home", {
      title: "My First App - Contact_List",
      contacts: contacts,
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

app.post("/create-contact", (req, res) => {
  Contact.create(req.body, (err, newContact) => {
    if (err) {
      console.log("error in creating the database", err);
      return;
    }
    console.log(newContact);
  });

  return res.redirect("back");
});

app.get("/delete-contact", (req, res) => {
  let id = req.query.id;

  Contact.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log("error in deleting contact");
      return;
    }
    return res.redirect("back");
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log("error", err);
    return;
  }
  console.log("server is running on port : ", port);
});
