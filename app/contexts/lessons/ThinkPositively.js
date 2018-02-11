const SynonymBox = require("../../model/SynonymBox");
const Message = require("../../logic/Message");
const Context = require("../Context");

function getInstance() {
    return new ThinkPositively();
}

function ThinkPositively() {

    this.lessonId = "think-positively";

    this.suggesters = new SynonymBox.SynonymBox();
    this.suggesters.add("You know how CBT is about reprogramming your brain, right? So, one thing I can teach you is how to think more positively in your everyday live. Are you interested in that?");
    this.suggesters.add("An easy way to improve your life is to have a better attitude towards yourself. Would you like me to teach you how to do that?");
    this.suggesters.add("I have a great way for you to improve your everyday life. It's all about thiking positively. Would you like me to show you what I mean?");

    this.input = function (meta) {
        Context.backToDefault(meta);
        Message.NoReply("This lesson on positivity is not yet implemented", meta);
    };

    this.defaultInput = this.input;
}

module.exports = {
    ThinkPositively,
    getInstance
};