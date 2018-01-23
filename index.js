const express = require('express');
const app = express();
const dbCreds = require('./dbCredentials').credentials;


app.get('/', function (req, res) {
    res.send("Hello World!");
});

app.listen(3000, function () {
   console.log("Server started on port 3000");
   console.log("DB user: " + dbCreds.username);
   console.log("DB pass: " + dbCreds.password);
});