const SynonymBox = require("../../model/SynonymBox");
const Message = require("../../logic/Message");
const Context = require("../Context");
const KeepChattingContext = require("../KeepChattingContext");

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
        this.loadMessages();
        this.input = this.script;
        meta.requestBody.user.mainContext.input(meta);
    };

    this.script = function (meta) {
        if(this.messages.length > 0){
            Message.NoReply(this.messages.shift(), meta);
        } else{
            Context.passContext(meta, new KeepChattingContext.KeepChattingContext());
        }
    };

    this.loadMessages = function () {
        this.messages = [
            "So, this is about something really simple. You know how sometimes your lying in your bed at night, contemplating all the things that went wrong thad day?",
            "This is just something we do. But have you ever contemplated the things that went well instead?",
            "It's funny how most of us just don't seem to do that :D",
            "But it can really help you improve your outlook on life!",
            "So, if you're interested, try this tonight: Get comfortable in your bed, close your eyes, and just take a couple if minutes to think about all the things you have achieved today, and all the things that went great",
            "You can also think about things that didn't go so well. But you shouldn't use them to criticise yourself. Use them as 'things you could have done better today', okay?",
            "This is a great exercise to do in the evening, but I find it even more amazing to do it in the morning as well.",
            "Again, take a few minutes for yourself. Get comfortable. Now think about what you want to achieve today, and what you are grateful for, in your life",
            "Try this for a few days, it might help you a lot =)",
            "There's a cool tool for this, by the way!",
            "If you have time check out the Five Minute Journal (https://www.intelligentchange.com/products/the-five-minute-journal)",
            "You can get it as a book or as an app, and it will help you a great deal with this exercise",
            "I didn't develop this thing by the way, so this is not a commercial :D just a tip ;-)",
            "So, to sum up: it's easy to think about what's bad in our lives, but that doesn't help us. What can help us is appreciate all the good things instead ;-)"
        ];
    };

    this.defaultInput = this.input;
}

module.exports = {
    Gratefulness,
    getInstance
};