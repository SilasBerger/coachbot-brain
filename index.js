const express = require('express');
const bodyParser = require('body-parser');
const Dialogflow = require('./app/dialogflow');
const User = require("./app/model/User");
const DefaultContext = require("./app/contexts/DefaultContext");
const GreetingContext = require('./app/contexts/GreetingContext');

// --- Bootstrap the application ---

const app = express();
app.use(bodyParser.json());
const dialogflow = new Dialogflow.dialogflow();

const port = (process.env.PORT || 3000);

app.get('/', function (req, res) {
    res.send("CoachBot Brain");
});

app.post('/webhook', function (req, res) {
    dialogflow.newRequest(req, res);
});

var testuser = new User.User("test-user-01");
testuser.name = "Jon";
testuser.mainContext = new GreetingContext.GreetingContext();


app.listen(port, function () {
   console.log("Server started on port " + port);
});