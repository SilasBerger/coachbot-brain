const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");
const ByeContext = require("./ByeContext");

exports.StopChattingContext = function () {

    this.input = function (meta) {
        this.scriptIndex = 0;
        this.input = this.script;
        this.input(meta);
    };

    this.script = function (meta) {
        var sb = new SynonymBox.SynonymBox();
        switch (this.scriptIndex){
            case 0:
                this.scriptIndex = 1;
                Message.YesNoDecision("Would you like to stop chatting?", meta);
                break;
            case 1:
                this.handleYesNoResponse(meta, 2,3,4);
                break;
            case 2:
                Context.passContext(meta, new ByeContext.ByeContext());
                break;
            case 3:
                meta.requestBody.user.mainContext = meta.requestBody.user.savedContext;
                Message.NoReply("Okay, we'll keep talking for a bit ;-)", meta);
                break;
            case 4:
                this.scriptIndex = 1;
                Message.YesNoDecision("Sorry, I didn't understand that. Would you like to stop chatting?", meta);
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

    this.defaultInput = this.input;

};