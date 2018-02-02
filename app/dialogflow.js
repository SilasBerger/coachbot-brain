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
    requestBody.user.mainContext.input(requestBody, responsePayload, res);
}

function response(responsePayload, responseObject){
    responseObject.json(responsePayload);
}

function getRequestBody(req) {
    var rb = {};
    const reqBody = req.body;
    rb.action = reqBody.result.action;
    rb.resolvedQuery = reqBody.result.resolvedQuery;
    rb.contexts = reqBody.result.contexts;
    rb.intent = reqBody.result.metadata.intentName;
    rb.userId = "test-user-01";
    rb.user = User.getUser(rb.userId);
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