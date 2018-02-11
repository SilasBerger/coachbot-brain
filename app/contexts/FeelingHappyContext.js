const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");

exports.FeelingHappyContext = function () {

    this.defaultInput = function (meta) {
        this.scriptIndex = 0;
        this.input = this.script;
        this.input(meta);
    };

    this.script = function (meta) {
        var sb = new SynonymBox.SynonymBox();
        switch(this.scriptIndex){
            case 0:
                this.scriptIndex = 1;
                sb = new SynonymBox.SynonymBox();
                sb.add("Great! That is always good to hear :D What made you so happy?");
                sb.add("Wonderful, nice to hear that! What made you so happy today?");
                sb.add("Amazing! How comes?");
                Message.NoReply(sb.get(), meta);
                break;
            case 1:
                Context.backToDefault(meta);
                sb = new SynonymBox.SynonymBox();
                sb.add("Aah, I see, very nice ;-)");
                sb.add("Oh, that sounds great! I'm really happy for you :D");
                sb.add("Oh wow, that's cool! :D");
                sb.add("I see, that's nice :D By the way, " + meta.requestBody.user.name + ", telling someone about what made you happy is a great tool to improve your overall happiness. It makes you reflect over the good things in your life =)");
                Message.NoReply(sb.get(), meta);
                break;
        }
    };

    this.input = this.defaultInput;

};