const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");

exports.ByeContext = function () {

    this.defaultInput = function (meta) {
        Context.endConversation(meta);
        var sb = new SynonymBox.SynonymBox();
        sb.add("Okay, I'll see you soon, " + meta.requestBody.user.name + ", take care =)");
        sb.add("Okay, bye " + meta.requestBody.user.name + ", talk to you soon");
        sb.add("Great, hope we'll be chatting again soon, " + meta.requestBody.user.name + "! =)");
        Message.NoReply(sb.get(), meta);
    };

    this.input = this.defaultInput;

};