const express = require("express");
const expresslayouts = require("express-ejs-layouts");
const connectDB = require("./server/DbConfig/db");
// const { flash } = require("express-flash-message");
const session = require("express-session");
const flash = require("express-flash");
const methodOverride = require("method-override");

//ENVIRONMENT VARIABLES
require("dotenv").config();

//INITIALIZE EXPRESS
const app = express();

//PORT
const PORT = 5000 || process.env.PORT;

// CONNECT TO DATABASE
connectDB();

// MIDDLEWARES
// PASSING FORM DATA
app.use(express.urlencoded({ extended: true }));


app.use(express.json());
app.use(methodOverride("_method"));


// FLASH SETUP
app.use(flash({ sessionKeyName: "flashMessage" }));

//STATIC FILES
app.use(express.static("public"));

//EXPRESS SESSION
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //1 week
    },
  })
);

//TEMPLATE ENGINE
app.use(expresslayouts);
app.set("layout", "./layouts/main");

//VIEW ENGINE
app.set("view engine", "ejs");

// ROUTES
app.use("/", require("./server/routes/customer"));

// 404 PAGES
app.get("/*", (req, res) => {
  res.status(404).render("404");
});

//LISTENING TO PORT
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
