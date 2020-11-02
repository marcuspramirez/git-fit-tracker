const express = require("express");
const mongoose = require("mongoose");
const db = require("./models");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
  
});

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));


// see if we succuessfully are connected to the database
const dbase = mongoose.connection;
dbase.on('error', console.error.bind(console, 'connection error:'));
dbase.once('open', function() {
  console.log("we're connected!");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});