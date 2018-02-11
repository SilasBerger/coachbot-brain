const lessons = require("../model/Lessons").Lessons;
const Message = require("../logic/Message");
const Context = require("../contexts/Context");
const SynonymBox = require("../model/SynonymBox");
const ByeContext = require("../contexts/ByeContext");

exports.TopicSelectorContext = function () {

    const msToDays = 86400000;

    const cat9DueAfterDays = 30;
    const remindCat9AfterDays = 5;

    this.defaultInput = function(meta) {
        if (this.shouldRemindCat9(meta.requestBody.user)) {
            //TODO: suggest CAT 9
        } else {
            this.scriptIndex = 0;
            this.input = this.chooseLesson;
            this.input(meta);
        }
    };

    this.chooseLesson = function (meta) {
        switch (this.scriptIndex) {
            case 0:
                this.scriptIndex = 1;
                //TODO: handle case when no more lessons available (graceful exit)
                this.lessonChoice = this.randomLesson(meta.requestBody.user).getInstance();
                Message.YesNoDecision(this.compileMessage(this.lessonChoice.suggesters.get()), meta);
                break;
            case 1:
                this.handleYesNoResponse(meta, 2, 3, 4);
                break;
            case 2:
                Context.passContext(meta, this.lessonChoice);
                break;
            case 3:
                this.scriptIndex = 5;
                var sb = new SynonymBox.SynonymBox();
                sb.add("Okay, no problem ;-) Would you like to work on something else?");
                Message.YesNoDecision(sb.get(), meta);
                break;
            case 4:
                this.scriptIndex = 1;
                Message.YesNoDecision("Sorry, I didn't understand that haha :D Would you like me to teach you this lesson?", meta);
                break;
            case 5:
                this.handleYesNoResponse(meta, 6, 7, 8);
                break;
            case 6:
                this.msgPrefix = "Okay, sure!";
                this.scriptIndex = 0;
                this.input(meta);
                break;
            case 7:
                Context.passContext(meta, new ByeContext.ByeContext());
                break;
            case 8:
                this.scriptIndex = 5;
                Message.YesNoDecision("Sorry, I didn't understand that haha :D Would you like to work on something else?", meta);
                break;
        }
    };


    this.shouldRemindCat9 = function(user){
        var now = new Date();
        var daysSinceLastCat9 = (now - user.lastCAT9Performed) / msToDays;
        var daysSinceLastCat9Suggested = (now - user.lastCAT9Suggested) / msToDays;
        return (daysSinceLastCat9 >= cat9DueAfterDays) && (daysSinceLastCat9Suggested >= remindCat9AfterDays);
    };

    this.randomLesson = function(user) {
        //var newLessons = lessons.filter(lesson => user.lessonsCompleted.indexOf(lesson.lessonId) < 0);
        var newLessons = lessons;
        var randIndex = Math.floor(Math.random() * newLessons.length);
        var lesson = newLessons[randIndex];
        return lesson;
    };

    this.handleYesNoResponse = function (meta, trueIndex, falseIndex, undefinedIndex) {
        if (meta.requestBody.decisionResult === undefined) {
            this.scriptIndex = undefinedIndex;
        } else if (meta.requestBody.decisionResult) {
            this.scriptIndex = trueIndex;
        } else {
            this.scriptIndex = falseIndex;
        }
        this.input(meta);
    };

    this.compileMessage = function (msg) {
        var pref = (this.msgPrefix === undefined ? "" : (this.msgPrefix + " "));
        var suff = (this.msgSuffix === undefined ? "" : (" " + this.msgSuffix));
        this.msgPrefix = undefined;
        this.msgSuffix = undefined;
        return pref + msg + suff;
    };

    this.input = this.defaultInput;

};