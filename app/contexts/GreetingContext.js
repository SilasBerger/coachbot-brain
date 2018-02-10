const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");

exports.GreetingContext = function () {

    this.greetings = new SynonymBox.SynonymBox();
    this.greetings.add("Oh, hey there! How are you doing?");
    this.greetings.add("Oh, hi, nice to see you! How are you, pal?");
    this.greetings.add("Hey! Great to see you! How are you feeling?");
    this.greetings.add("Hello! Nice to hear from you =) How are you doing?");


    this.input = function (meta) {
        if(meta.requestBody.user.isFirstTimeUser){
            //TODO: take appropriate action
        } else{
            Context.backToDefault(meta);
            Message.NoReply(this.greetings.get(), meta);
        }
    };

    this.defaultInput = this.input;

};