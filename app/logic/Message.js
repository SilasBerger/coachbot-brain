const dialogflow = require("../dialogflow");
const SynonymBox = require("../model/SynonymBox");

// Syn boxes
const didNotUnderstandReplys = new SynonymBox.SynonymBox();
didNotUnderstandReplys.add("Sorry, I didn't understand that...");
didNotUnderstandReplys.add("Sorry, I don't understand what you are saying");
didNotUnderstandReplys.add("Hmm... I'm not sure I understand :D Remember, I'm just a robot ;-)");


exports.NoReply = function (message, meta) {
    meta.responsePayload.speech = message;
    dialogflow.response(meta);
};

exports.DidNotUnderstand = function (meta) {
    meta.responsePayload.speech = didNotUnderstandReplys.get();
    dialogflow.response(meta);
};