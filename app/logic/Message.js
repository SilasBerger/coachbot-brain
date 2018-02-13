const SynonymBox = require("../model/SynonymBox");

// Syn boxes
const didNotUnderstandReplys = new SynonymBox.SynonymBox();
didNotUnderstandReplys.add("Sorry, I didn't understand that...");
didNotUnderstandReplys.add("Sorry, I don't understand what you are saying");
didNotUnderstandReplys.add("Hmm... I'm not sure I understand :D Remember, I'm just a robot ;-)");


exports.NoReply = function (message, meta) {
    meta.responsePayload.speech = message;
    meta.dialogflow.response(meta);
};

exports.DidNotUnderstand = function (meta) {
    meta.responsePayload.speech = didNotUnderstandReplys.get();
    meta.dialogflow.response(meta);
};

exports.YesNoDecision = function (question, meta){
    meta.responsePayload.speech = question;
    meta.dialogflow.response(meta);
    var originalInput = meta.requestBody.user.mainContext.input;
    meta.requestBody.user.mainContext.input = function (meta) {
        meta.requestBody.user.mainContext.input = originalInput;
        switch(meta.requestBody.action){
            case "decision.yes":
                meta.requestBody.decisionResult = true;
                meta.requestBody.user.mainContext.input(meta);
                break;
            case "decision.no":
                meta.requestBody.decisionResult = false;
                meta.requestBody.user.mainContext.input(meta);
                break;
            default:
                meta.requestBody.decisionResult = undefined;
                meta.requestBody.user.mainContext.input(meta);
                break;
        }
    }
};