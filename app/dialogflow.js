const User = require("./model/User");
const ResetContextContext = require("./contexts/ResetContextContext");
const Context = require("./contexts/Context");
const StopChattingContext = require("./contexts/StopChattingContext");
const ChangeTopicContext = require("./contexts/ChangeTopicContext");

exports.dialogflow = function () {

    this.newRequest = function(req, res) {
        var requestBody = this.getRequestBody(req);
        var responsePayload = {
            speech: "",
            displayText: "No display text",
            data: {},
            contextOut: [],
            source: "CoachBot Brain"
        };
        this.logRequest(requestBody);

        var meta = {requestBody: requestBody, responsePayload: responsePayload, responseObject: res, dialogflow: this};
        if(requestBody.resolvedQuery === "/reset"){
            Context.passContext(meta, new ResetContextContext.ResetContextContext());
        } else if(requestBody.action === "stop-chatting"){
            requestBody.user.savedContext = requestBody.user.mainContext;
            Context.passContext(meta, new StopChattingContext.StopChattingContext());
        } else if(requestBody.action === "change-topic"){
            requestBody.user.savedContext = requestBody.user.mainContext;
            Context.passContext(meta, new ChangeTopicContext.ChangeTopicContext());
        }
        else{
            requestBody.user.mainContext.input(meta);
        }
    };

    this.response = function(meta){
        meta.responseObject.json(meta.responsePayload);
    };

    this.getRequestBody = function(req) {
        var rb = {};
        const reqBody = req.body;
        rb.action = reqBody.result.action;
        rb.resolvedQuery = reqBody.result.resolvedQuery;
        rb.contexts = reqBody.result.contexts;
        rb.intent = reqBody.result.metadata.intentName;

        // --- should come from DB ---
        rb.userId = "test-user-01";
        rb.user = User.getUser(rb.userId);
        rb.user.isFirstTimeUser = false; //if user not found in db: set true
        rb.user.lastPHQ9Performed = new Date(2018, 2, 10);
        rb.user.lastPHQ9Suggested = new Date(2018, 2, 10);
        rb.user.lessonsCompleted = ["what-is-cbt", "who-is-coachbot"];
        // ---------------------------

        return rb;
    };


    this.logRequest = function(requestBody){
        console.log("\nReceived webhook request");
        console.log("---------------------------");
        console.log("resolved query: " + requestBody.resolvedQuery);
        console.log("action: " + requestBody.action);
        console.log("contexts: ");
        requestBody.contexts.forEach(function (value) {
            console.log(value.name);
            console.log(value.parameters);
        })
    };
};