const SynonymBox = require("../../model/SynonymBox");
const Message = require("../../logic/Message");

function getInstance() {
    return new WhoIsCoachBot();
}

function WhoIsCoachBot() {

    this.lessonId = "who-is-coach-bot";

    this.suggesters = new SynonymBox.SynonymBox();
    this.suggesters.add("I would like to tell you a little bit about who I am, and what I do. Sound good?");
    this.suggesters.add("I would love to give you a short introduction about myself, okay?");
    this.suggesters.add("If you have a minute, I would like to tell you a little bit about who I am, and how I can help you, okay?");

    this.input = function (meta) {
        Message.NoReply("This lesson on CoachBot himself is not yet implemented", meta);
    };

    this.defaultInput = this.input;
}

module.exports = {
    WhoIsCoachBot,
    getInstance
};