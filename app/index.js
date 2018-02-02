const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('./dialogflow');
const SynonymBox = require('./SynonymBox');
const YesNoDecision = require("./logic/YesNoDecision");
const DecisionModel = require("./logic/DecisionModel");

// --- Bootstrap the application ---

const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("CoachBot Brain");
});

app.post('/webhook', function (req, res) {
    dialogflow.newRequest(req, res);
});


var ynd = new YesNoDecision.YesNoDecision(function (decision, requestBody, responsePayload, responseObject) {
    if(decision.decisionResultType === DecisionModel.DecisionResultTypes.yesNo){
        if(decision.decisionResult.result){
            responsePayload.speech = "You said yes";
        } else{
            responsePayload.speech = "You said no";
        }
    } else if(decision.decisionResultType === DecisionModel.DecisionResultTypes.subjectChange){
        responsePayload.speech = "You want to change the subject";
    } else{
        responsePayload.speech = "Sorry, I did not understand that";
    }

    dialogflow.response(responsePayload, responseObject);
});

dialogflow.context(ynd);


app.listen(3000, function () {
   console.log("Server started on port 3000");
});