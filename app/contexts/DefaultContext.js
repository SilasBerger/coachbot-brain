const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");
const GreetingContext = require("./GreetingContext");

exports.DefaultContext = function () {

    this.defaultInput = function (meta) {
        switch(meta.requestBody.action){
            case "input.welcome":
                Context.passContext(meta, new GreetingContext.GreetingContext());
                break;
            default:
                Message.DidNotUnderstand(meta);
        }
    };

    this.input = this.defaultInput;

};