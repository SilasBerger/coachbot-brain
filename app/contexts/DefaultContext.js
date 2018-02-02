const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");
const GreetingContext = require("./GreetingContext");

exports.DefaultContext = function () {

    this.input = function (requestBody, responsePayload, responseObject) {
        switch(requestBody.action){
            case "input.welcome":
                Context.passContext(requestBody, responsePayload, responseObject, new GreetingContext.GreetingContext());
                break;
            default:
                Message.DidNotUnderstand(requestBody, responsePayload, responseObject);
        }
    }

};