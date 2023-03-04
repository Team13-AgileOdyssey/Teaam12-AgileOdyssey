const express = require("express");
const app = express();
const session = require("express-session");
const static = express.static(__dirname + "/public");
const server = require('http').Server(app);
const configRoutes = require("./routes");

const exphbs = require("express-handlebars");
const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  partialsDir: ['views/partials/'],
  helpers: {
    ifEqual: function (arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    }
  }
});

app.use("/public", static);
app.use(express.json());

app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/navigation/*", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/");
  } else {
    next();
  }
});

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebarsInstance.engine);
app.set("view engine", "handlebars");

configRoutes(app);

server.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});