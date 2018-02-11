const Message = require("../logic/Message");
const Context = require("./Context");
const FeelingAngryContext = require("./FeelingAngryContext");
const FeelingHappyContext = require("./FeelingHappyContext");
const TopicSelectorContext = require("./TopicSelectorContext");

exports.DefaultContext = function () {

    this.defaultInput = function (meta) {
        switch(meta.requestBody.action){
            case "mood.angry":
                Context.passContext(meta, new FeelingAngryContext.FeelingAngryContext());
                break;
            case "mood.depressed":
                //TODO: take appropriate action
                Context.backToDefault(meta);
                Message.NoReply("This context is not yet implemented", meta);
                break;
            case "mood.anxious":
                //TODO: take appropriate action
                Context.backToDefault(meta);
                Message.NoReply("This context is not yet implemented", meta);
                break;
            case "mood.happy":
                Context.passContext(meta, new FeelingHappyContext.FeelingHappyContext());
                break;
            default:
                Context.passContext(meta, new TopicSelectorContext.TopicSelectorContext());
                break;
        }
    };

    this.talkHappyFeelings = function () {

    };

    this.input = this.defaultInput;

};