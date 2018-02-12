const SynonymBox = require("../../model/SynonymBox");
const Message = require("../../logic/Message");
const Context = require("../Context");
const KeepChattingContext = require("../KeepChattingContext");

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
            "So, what I would like to talk to you about is positivity.",
            "Or, in other words, how you can be kinder to yourself =)",
            "Tell me, have you ever said something like 'I'm late again, man, I'm always late'?",
            "Or 'That was so bad, I always make mistakes'?",
            "A lot of us do this. Well, I guess pretty much everyone does this, haha :D",
            "The thing is though, that's not fair!",
            "You're not ALWAYS late, you are SOMETIMES late. And you don't ALWAYS make mistakes, you SOMETIMES make mistakes, see what I mean?",
            "This seems like such a little difference, but you would be surprised how much it can change your attitude towards yourself!",
            "So, the next time you miss the bus, don't say 'That's typical, I always miss the bus'. Rather say 'Okay, I sometimes miss the bus, I'll try to leave a bit earlier tomorrow'.",
            "Sounds completely different, right?",
            "So, that's basically the whole story of it already =)",
        ];
    };

    this.defaultInput = this.input;
}

module.exports = {
    ThinkPositively,
    getInstance
};