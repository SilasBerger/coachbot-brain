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

exports.YesNoDecision = function (question, callback, preemptive, meta){
    meta.responsePayload.speech = question;
    dialogflow.response(meta);
    meta.requestBody.user.mainContext.input = function (meta) {
        meta.requestBody.user.mainContext.input = meta.requestBody.user.mainContext.defaultInput;
        switch(meta.requestBody.action){
            case "decision.yes":
                callback(true, meta);
                break;
            case "decision.no":
                callback(false, meta);
                break;
            default:
                callback(undefined, meta);
                break;
        }
    }
};

exports.Choice = function (question, expectedActions, callback, preemptive, meta){

};

exports.FreeTextResponse = function (question, callback, preemptive, meta){

};