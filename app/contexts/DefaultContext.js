const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");
const GreetingContext = require("./GreetingContext");
const TalkAboutFeelingsContext = require("./TalkAboutFeelingsContext");
const FeelingAngryContext = require("./FeelingAngryContext");

exports.DefaultContext = function () {

    this.generalFeelingTopics = ["mood.anxious", "mood.depressed", "mood.happy"];

    this.defaultInput = function (meta) {
        if(this.generalFeelingTopics.indexOf(meta.requestBody.action) >= 0){
            Context.passContext(meta, new TalkAboutFeelingsContext.TalkAboutFeelingsContext())
        } else{
            switch(meta.requestBody.action){
                case "input.welcome":
                    Context.passContext(meta, new GreetingContext.GreetingContext());
                    break;
                case "mood.angry":
                    Context.passContext(meta, new FeelingAngryContext.FeelingAngryContext());
                    break;
                default:
                    Message.DidNotUnderstand(meta);
            }
        }
    };

    this.talkHappyFeelings = function () {

    };

    this.input = this.defaultInput;

};