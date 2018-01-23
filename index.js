const express = require('express');
const dbConfig = require('./dbconf').config;
const bodyParser = require('body-parser');
const dialogflow = require('./dialogflow');

// Bootstrap the application

const app = express();
app.use(bodyParser.json());

dialogflow.setSpeechResponseAuthority(speechResponseAuthority);

app.get('/', function (req, res) {
    res.send("CoachBot Brain");
});

app.post('/webhook', function (req, res) {
    dialogflow.newRequest(req, res);
});


// Temporary, should be moved to some logic center
function speechResponseAuthority(requestBody) {
    if(requestBody.action === "input.welcome"){
        return "Hello from the otter slide!";
    }
    if (requestBody.action === "order.drink"){
        return "No drinks for you!"
    }
    return "No clue what you want from me...";
}


app.listen(3000, function () {
   console.log("Server started on port 3000");
});