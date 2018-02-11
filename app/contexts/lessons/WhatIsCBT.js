const SynonymBox = require("../../model/SynonymBox");
const Message = require("../../logic/Message");
const Context = require("../Context");

function getInstance() {
    return new WhatIsCBT();
}

function WhatIsCBT() {

    this.lessonId = "what-is-cbt";

    this.suggesters = new SynonymBox.SynonymBox();
    this.suggesters.add("So, what I would like to do is tell you a thing or two about CBT. Interested?");
    this.suggesters.add("Most people aren't really familiar with CBT, so I would like to tell you a thing or two about it, alright?");
    this.suggesters.add("Would you be interested in learning what CBT is, and what it can do for you?");

    this.input = function (meta) {
        Context.backToDefault(meta);
        Message.NoReply("This lesson on CBT is not yet implemented", meta);
    };

    this.defaultInput = this.input;
}

module.exports = {
    WhatIsCBT,
    getInstance
};