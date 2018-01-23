const express = require('express');
const dbCreds = require('./dbCredentials').credentials;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


const testResponse = {
    speech: "This is the speech response",
    displayText: "This is the display text",
    data: {},
    contextOut: [],
    source: "CoachBot Brain"
};

app.get('/', function (req, res) {
    res.send("CoachBot Brain");
});

app.post('/webhook', function (req, res) {
    res.json(testResponse);

    const reqBody = req.body;
    const action = reqBody.result.action;
    const resolvedQuery = reqBody.result.resolvedQuery;
    const contexts = reqBody.result.contexts;

    console.log("\nReceived webhook request");
    console.log("---------------------------")
    console.log("resolved query: " + resolvedQuery);
    console.log("action: " + action);
    console.log("contexts: ");
    contexts.forEach(function (value) {
        console.log(value.name);
        console.log(value.parameters);
    })
});

app.listen(3000, function () {
   console.log("Server started on port 3000");
});