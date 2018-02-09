const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");

exports.FeelingAngryContext = function () {


    this.input = function (meta) {
        var sb = new SynonymBox.SynonymBox();
        sb.add("Grrr! What are you angry about?");
        sb.add("I know that feeling (yes, bots have feelings :D)! What made you so angry?");
        sb.add("Sorry to hear that, but you came to the right friend! You can leave it all out on me, and I wont get mad ;-). What are you angry about? Lay ot on me!");

        this.scriptIndex = 0;
        this.input = this.scripted;

        Message.NoReply(sb.get(), meta);
    };

    this.scripted = function (meta) {
        switch (this.scriptIndex){
            case 0:
                this.scriptIndex = 1;
                Message.NoReply("That sucks =( I feel for you, dude! But you know what? I really feel like talking about it can help a lot!", meta);
                break;
            case 1:
                Context.backToDefault(meta);
                Message.NoReply("Hope I was able to help you. See you soon, buddy!!", meta);
                break;
        }
    };

    this.defaultInput = this.input;

};