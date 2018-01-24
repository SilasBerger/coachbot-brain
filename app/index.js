const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('./dialogflow');

// --- Bootstrap the application ---

const app = express();
app.use(bodyParser.json());

// should later be adapted to actual response engine / brain
dialogflow.setSpeechResponseAuthority(speechResponseAuthority);

app.get('/', function (req, res) {
    res.send("CoachBot Brain");
});

app.post('/webhook', function (req, res) {
    dialogflow.newRequest(req, res);
});


// Temporary, should be moved to some logic center
function speechResponseAuthority(requestBody) {

    /*
     * Dialogflow seems to show some unexpected behavior. The action is often empty.
     * Using the intent as a fallback for now. Need to find out the difference between intent
     * and action though.
     */
    var decider = requestBody.action;
    if(decider === "" || decider === null || decider === undefined){
        decider = requestBody.intent;
    }

    switch(decider){
        case "input.welcome":
            return "Heyo! How are you doing?";
        case "mood.happy":
            return "Great to her that! I love seeing you happy ;-)";
        case "mood.sad":
            return "Sorry, to hear that. What's up? =(";
        default:
            return "Sorry, I'm trying by best, but I didn't understand that...";
    }
}


app.listen(3000, function () {
   console.log("Server started on port 3000");
});