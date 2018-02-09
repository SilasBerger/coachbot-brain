const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");

exports.TalkAboutFeelingsContext = function () {

    this.negativeFeelings = ["mood.angry", "mood.anxious", "mood.depressed"];
    this.positiveFeelings = ["mood.happy"];


    this.input = function (meta) {
        if(this.negativeFeelings.indexOf(meta.requestBody.action) >= 0){
            Message.NoReply("Sorry to hear that", meta);
        } else if(this.positiveFeelings.indexOf(meta.requestBody.action) >= 0){
            Message.NoReply("Great to hear that!", meta);
        } else{
            Message.DidNotUnderstand(meta);
        }
    };

    this.defaultInput = this.input;

};