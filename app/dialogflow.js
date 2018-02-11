const User = require("./model/User");

var currentContext;

function context(newContext) {
    currentContext = newContext;
}

function newRequest(req, res) {
    var requestBody = getRequestBody(req);
    var responsePayload = {
        speech: "",
        displayText: "No display text",
        data: {},
        contextOut: [],
        source: "CoachBot Brain"
    };
    logRequest(requestBody);
    requestBody.user.mainContext.input({requestBody: requestBody, responsePayload: responsePayload, responseObject: res});
}

function response(meta){
    meta.responseObject.json(meta.responsePayload);
}

function getRequestBody(req) {
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
}


function logRequest(requestBody){
    console.log("\nReceived webhook request");
    console.log("---------------------------");
    console.log("resolved query: " + requestBody.resolvedQuery);
    console.log("action: " + requestBody.action);
    console.log("contexts: ");
    requestBody.contexts.forEach(function (value) {
        console.log(value.name);
        console.log(value.parameters);
    })
}

module.exports = {
    context,
    newRequest,
    response
};