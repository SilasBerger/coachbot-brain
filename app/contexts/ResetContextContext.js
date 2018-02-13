const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");
const GreetingContext = require("./GreetingContext");

exports.ResetContextContext = function () {

    this.defaultInput = function (meta) {
        meta.requestBody.user.mainContext = new GreetingContext.GreetingContext();
        Message.NoReply("Context reset", meta);
    };

    this.input = this.defaultInput;

};