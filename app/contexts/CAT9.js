const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");

exports.GreetingContext = function () {

    this.input = function (meta) {
        if(meta.requestBody.user.isFirstTimeUser){
            //TODO: take appropriate action
        } else{
            Context.backToDefault(meta);
            var greetings = new SynonymBox.SynonymBox();
            greetings.add("Oh, hey there " + meta.requestBody.user.name + "! How are you doing?");
            greetings.add("Oh, hi, nice to see you " + meta.requestBody.user.name + "! How are you, pal?");
            greetings.add("Hey! Great to see you, " + meta.requestBody.user.name + "! How are you feeling?");
            greetings.add("Hey " + meta.requestBody.user.name+ "! Nice to hear from you =) How are you doing?");
            Message.NoReply(greetings.get(), meta);
        }
    };

    this.defaultInput = this.input;

};