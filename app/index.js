const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('./dialogflow');
const SynonymBox = require('./SynonymBox');

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


// Temporary proof of concept
const greetings = new SynonymBox.SynonymBox();
const happyForYou = new SynonymBox.SynonymBox();
const sorryForYou = new SynonymBox.SynonymBox();
const didNotUnderstand = new SynonymBox.SynonymBox();

greetings.add("Heyo! How are you doing?");
greetings.add("Hi! How are you?");
greetings.add("Hey! Nice hearing from you! How are you doing?");
greetings.add("Hello! What's up?");

happyForYou.add("Great to her that! I love seeing you happy ;-)");
happyForYou.add("Amazing! If you're happy, I'm happy :D");
happyForYou.add("That's great news, I'm happy for you!");
happyForYou.add("Awesome!");

sorryForYou.add("You deserve sadness...");
sorryForYou.add("Sorry, to hear that. What's up? =(");
sorryForYou.add("Sounds bad. What happened?");
sorryForYou.add("I guess that happens from time to time... What can I do to cheer you up? =)");


didNotUnderstand.add("Sorry, I'm trying by best, but I didn't understand that...");
didNotUnderstand.add("Sorry, I'm not sure I understand what you mean.");
didNotUnderstand.add("Can you rephrase that? Remember, I'm just a robot ;-)");


// Temporary, should be moved to some logic center
function speechResponseAuthority(requestBody) {

    /*
     * Note: the action is defined by the user. It seems to be similar to the intent though (can define one action per
     * intent). Instead of falling back to intent, should be sure to know difference between intent and action, and
     * just throw an error if no action is present.
     */
    var decider = requestBody.action;
    if(decider === "" || decider === null || decider === undefined){
        decider = requestBody.intent;
    }

    switch(decider){
        case "input.welcome":
            return greetings.get();
        case "mood.happy":
            var feelingSources = getFeelingSources(requestBody);
            return generateHappyResponse(feelingSources);
        case "mood.sad":
            return sorryForYou.get();
        default:
            return didNotUnderstand.get();
    }
}


function generateHappyResponse(feelingSources) {
    var res = "I understood that you are happy for the following reasons: ";
    for(var i = 0; i<feelingSources.length; i++){
        res += feelingSources[i];
        if(i < (feelingSources.length - 1)){
            res += ", ";
        }
    }
    return res;
}

function getFeelingSources(requestBody){
    var contexts = requestBody.contexts;
    contexts.forEach(function (context) {
        if(context.name === "context_mood_happy"){
            var feelingSources = [];
            context.parameters.feeling_sources.forEach(function (each) {
                feelingSources.push(each);
            });
            return feelingSources;
        }
    });
    return null;
}

app.listen(3000, function () {
   console.log("Server started on port 3000");
});