const SynonymBox = require("../../model/SynonymBox");
const Message = require("../../logic/Message");
const Context = require("../Context");

function getInstance() {
    return new Gratefulness();
}

function Gratefulness() {

    this.lessonId = "gratefulness";

    this.suggesters = new SynonymBox.SynonymBox();
    this.suggesters.add("A great way to improve your life is to start being mindful about gratefulness. For example, I'm grateful that I can talk to you today =) Wanna hear more?");
    this.suggesters.add("I am so grateful that we are chatting today ;-) Gratefulness can help us a lot, by the way! Would you like me to explain?");
    this.suggesters.add("You know that thanksgiving game where everybody says what they're thankful for? That's actually more than just a game, if you as me (and CBT)! Would you be *thankful* to hear more? :D");

    this.input = function (meta) {
        Context.backToDefault(meta);
        Message.NoReply("This lesson on gratefulness himself is not yet implemented", meta);
    };

    this.defaultInput = this.input;
}

module.exports = {
    Gratefulness,
    getInstance
};