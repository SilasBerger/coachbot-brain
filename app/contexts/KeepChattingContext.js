const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");
const TopicSelectorContext = require("./TopicSelectorContext");
const ByeContext = require("./ByeContext");

exports.KeepChattingContext = function () {

    this.defaultInput = function (meta) {
        this.scriptIndex = 0;
        this.input = this.script;
        this.input(meta);
    };

    this.script = function (meta) {
        switch(this.scriptIndex){
            case 0:
                this.scriptIndex = 1;
                var sb = new SynonymBox.SynonymBox();
                sb.add("Would you like to talk some more?");
                sb.add("We can keep chatting, if you want! What do you say?");
                Message.YesNoDecision(this.compileMessage(sb.get()), meta);
                break;
            case 1:
                this.handleYesNoResponse(meta, 2,3,4);
                break;
            case 2:
                Context.passContext(meta, new TopicSelectorContext.TopicSelectorContext());
                break;
            case 3:
                Context.passContext(meta, new ByeContext.ByeContext());
                break;
            case 4:
                this.scriptIndex = 0;
                this.msgPrefix = "Sorry, I did't quite understand you there :D";
                meta.requestBody.user.mainContext.input(meta);
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

    this.compileMessage = function(msg) {
        var pref = (this.msgPrefix === undefined ? "" : (this.msgPrefix + " "));
        var suff = (this.msgSuffix === undefined ? "" : (" " + this.msgSuffix));
        this.msgPrefix = undefined;
        this.msgSuffix = undefined;
        return pref + msg + suff;
    };


    this.input = this.defaultInput;

};