const dialogflow = require("../dialogflow");
const SynonymBox = require("../model/SynonymBox");

// Syn boxes
const didNotUnderstandReplys = new SynonymBox.SynonymBox();
didNotUnderstandReplys.add("Sorry, I didn't understand that...");
didNotUnderstandReplys.add("Sorry, I don't understand what you are saying");
didNotUnderstandReplys.add("Hmm... I'm not sure I understand :D Remember, I'm just a robot ;-)");


exports.NoReply = function (message, responsePayload, responseObject) {
    responsePayload.speech = message;
    dialogflow.response(responsePayload, responseObject);
};

exports.DidNotUnderstand = function (message, responsePayload, responseObject) {
    responsePayload.speech = didNotUnderstandReplys.get();
    dialogflow.response(responsePayload, responseObject);
};