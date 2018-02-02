const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('./dialogflow');
const User = require("./model/User");
const DefaultContext = require("./contexts/DefaultContext");

// --- Bootstrap the application ---

const app = express();
app.use(bodyParser.json());

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


app.listen(3000, function () {
   console.log("Server started on port 3000");
});