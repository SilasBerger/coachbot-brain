const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('./dialogflow');
const SynonymBox = require('./SynonymBox');
const YesNoDecision = require("./logic/YesNoDecision");
const DecisionModel = require("./logic/DecisionModel");
const User = require("./model/User");

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


var ynd = new YesNoDecision.YesNoDecision(function (decision, requestBody, responsePayload, responseObject) {
    if(decision.decisionResultType === DecisionModel.DecisionResultTypes.yesNo){
        if(decision.decisionResult.result){
            responsePayload.speech = requestBody.user.firstName + ", you said yes";
        } else{
            responsePayload.speech = requestBody.user.firstName + ", you said no";
        }
    } else if(decision.decisionResultType === DecisionModel.DecisionResultTypes.subjectChange){
        responsePayload.speech =  "Okay, " + requestBody.user.firstName + ", you want to change the subject";
    } else{
        responsePayload.speech = "Sorry, " + requestBody.user.firstName + ", I did not understand that";
    }

    dialogflow.response(responsePayload, responseObject);
});

testuser.mainContext = ynd;


app.listen(3000, function () {
   console.log("Server started on port 3000");
});