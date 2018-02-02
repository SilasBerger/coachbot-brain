const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");

exports.GreetingContext = function () {

    this.greetings = new SynonymBox.SynonymBox();
    this.greetings.add("Oh, hey there!");
    this.greetings.add("Oh, hi, nice to see you!");
    this.greetings.add("Hey! Great to see you!");
    this.greetings.add("Hello! Nice to hear from you =)");


    this.input = function (meta) {
        Message.YesNoDecision("Hey! Are you feeling well today?", function (result, meta) {
            if(result === undefined){
                Message.DidNotUnderstand(meta);
                console.log("response not understood");
            } else if(result){
                Message.NoReply("Great! Happy to hear that!", meta);
                console.log("is feeling well");
            } else{
                Message.NoReply("Sorry to hear that... Hope you'll feel better soon!", meta);
                console.log("is feeling bad");
            }
            Context.backToDefault(meta);
        }, false, meta);
    };

    this.defaultInput = this.input;

};