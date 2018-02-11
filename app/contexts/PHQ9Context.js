const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");

exports.PHQ9Context = function () {

    this.normalThreshold = 5; //below: healthy
    this.minorDepressionThreshold = 10;
    this.moderateDepressionThreshold = 15;
    this.severeDepressionThreshold = 20;

    this.resultTypes = {
        healthy: 0,
        normal: 1,
        minorDepression: 2,
        moderateDepression: 3,
        severeDepression: 4
    };

    this.questions = [
        {
            questionNumber: 1,
            question: "Little interest or joy in your activities"
        },
        {
            questionNumber: 2,
            question: "Low spirit, melancholia, or hopelessness"
        },
        {
            questionNumber: 3,
            question: "Difficulty falling asleep or sleeping through the night, or increased sleep"
        },
        {
            questionNumber: 4,
            question: "Tiredness, or felt like you have no energy"
        },
        {
            questionNumber: 5,
            question: "Diminished appetite, or excessive need for eating"
        },
        {
            questionNumber: 6,
            question: "Bad opinion about yourself, felt like you were a loser or have disappointed your family"
        },
        {
            questionNumber: 7,
            question: "Difficulty concentrating, for example when reading the newspaper, or watching TV"
        },
        {
            questionNumber: 8,
            question: "Has your movement or language slowed down to the point where others might notice? Or have you been more fidgety and restless, woth an unusually strong urge for movement?"
        },
        {
            questionNumber: 9,
            question: "Thoughts of wanting to be dead or harming oneself"
        },
    ];

    this.input = function (meta) {
        //TODO: implement test script
    };

    this.getPHQResult = function () {
        var points = 0;
        var result;

        this.questions.forEach(function (question) {
            points += question.result;
        });

        if(points < this.normalThreshold){
            result = this.resultTypes.healthy;
        } else if(points < this.minorDepressionThreshold){
            result = this.resultTypes.normal;
        } else if(points < this.moderateDepressionThreshold){
            result = this.resultTypes.minorDepression;
        } else if(points < this.severeDepressionThreshold){
            result = this.resultTypes.moderateDepression;
        } else{
            result = this.resultTypes.severeDepression;
        }

        return { points: points, result: result};
    };

    this.defaultInput = this.input;

};