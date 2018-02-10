const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");
const GreetingContext = require("./GreetingContext");
const TalkAboutFeelingsContext = require("./TalkAboutFeelingsContext");
const FeelingAngryContext = require("./FeelingAngryContext");

exports.DefaultContext = function () {

    this.defaultInput = function (meta) {
        switch(meta.requestBody.action){
            case "mood.angry":
                Context.passContext(meta, new FeelingAngryContext.FeelingAngryContext());
                break;
            case "mood.depressed":
                //TODO: take appropriate action
                Context.backToDefault(meta);
                Message.NoReply("This context is not yet implemented");
                break;
            case "mood.anxious":
                //TODO: take appropriate action
                Context.backToDefault(meta);
                Message.NoReply("This context is not yet implemented");
                break;
            case "mood.happy":
                //TODO: take appropriate action
                Context.backToDefault(meta);
                Message.NoReply("This context is not yet implemented");
                break;
            default:
                //TODO: go to topic selector
                break;
        }
    };

    this.talkHappyFeelings = function () {

    };

    this.input = this.defaultInput;

};