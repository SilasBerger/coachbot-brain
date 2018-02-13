const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");
const CheerUpLinks = require("../model/CheerUpLinks");
const KeepChattingContext = require("./KeepChattingContext");

exports.FeelingDepressedContext = function () {

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
                sb.add("Oh no, so sorry to hear that... =( Why are you sad?");
                sb.add("Oh dear, that's not good =(( What happened?");
                sb.add("So sorry to hear that buddy! What's up?");
                Message.NoReply(sb.get(), meta);
                break;
            case 1:
                this.scriptIndex = 2;
                sb = new SynonymBox.SynonymBox();
                sb.add("Oh, I see... So sorry for you!");
                sb.add("That sucks =( I feel for you!");
                Message.NoReply(sb.get(), meta);
                break;
            case 2:
                this.scriptIndex = 3;
                sb = new SynonymBox.SynonymBox();
                sb.add("Would you like me to cheer you up? I got some things that might help you =)");
                sb.add("You know what, I got some stuff that might cheer you up. Wanna see?");
                Message.YesNoDecision(sb.get(), meta);
                break;
            case 3:
                this.handleYesNoResponse(meta, 4,5,6);
                break;
            case 4:
                this.scriptIndex = 7;
                sb = new SynonymBox.SynonymBox();
                sb.add("Okay, here's something great: ");
                sb.add("Alright, got you something :D ");
                sb.add("Have a look at this :D ");
                Message.NoReply(sb.get() + CheerUpLinks.randomElement(), meta);
                break;
            case 5:
                Context.passContext(meta, new KeepChattingContext.KeepChattingContext());
                break;
            case 6:
                this.scriptIndex = 3;
                Message.YesNoDecision("Sorry, I didn't understand that... Would you like me to show you some stuff to cheer you up?", meta);
                break;
            case 7:
                this.scriptIndex = 8;
                Message.YesNoDecision("Hope you enjoyed that :D I got more of this, if you want? =)", meta);
                break;
            case 8:
                this.handleYesNoResponse(meta, 9,10,11);
                break;
            case 9:
                this.scriptIndex = 4;
                meta.requestBody.user.mainContext.input(meta);
                break;
            case 10:
                Context.passContext(meta, new KeepChattingContext.KeepChattingContext());
                break;
            case 11:
                this.scriptIndex = 8;
                Message.YesNoDecision("Sorry, I didn't really get that :D Would you like to see some more videos and pictures?", meta);
                break;
        }
    };

    this.handleYesNoResponse = function (meta, trueIndex, falseIndex, undefinedIndex) {
        if(meta.requestBody.decisionResult === undefined){
            this.scriptIndex = undefinedIndex;
        } else if(meta.requestBody.decisionResult){
            this.scriptIndex = trueIndex;
        } else{
            this.scriptIndex = falseIndex;
        }
        this.input(meta);
    };

    this.input = this.defaultInput;

};