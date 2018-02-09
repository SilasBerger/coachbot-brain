const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('./app/dialogflow');
const User = require("./app/model/User");
const DefaultContext = require("./app/contexts/DefaultContext");

// --- Bootstrap the application ---

const app = express();
app.use(bodyParser.json());

const port = process.env.port || 3000;

app.get('/', function (req, res) {
    res.send("CoachBot Brain");
});

app.post('/webhook', function (req, res) {
    dialogflow.newRequest(req, res);
});

var testuser = new User.User("test-user-01");
testuser.firstName = "Jon";
testuser.lastName = "Doe";
testuser.mainContext = new DefaultContext.DefaultContext();


app.listen(port, function () {
   console.log("Server started on port 3000");
});