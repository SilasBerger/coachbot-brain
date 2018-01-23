const subscriberCallbacks = [];
var speechResponseAuthority;

function subscribe(callback) {

}

function setSpeechResponseAuthority(sra) {
    speechResponseAuthority = sra;
}

function newRequest(req, res) {
    var requestBody = getRequestBody(req);
    var speechResponse = speechResponseAuthority(requestBody);
    var responsePayload = {
        speech: speechResponse,
        displayText: "No display text",
        data: {},
        contextOut: [],
        source: "CoachBot Brain"
    };
    res.json(responsePayload);
    logRequest(requestBody);
    subscriberCallbacks.forEach(function (callback) { callback(requestBody, responsePayload) })
}

function getRequestBody(req) {
    var rb = {};
    const reqBody = req.body;
    rb.action = reqBody.result.action;
    rb.resolvedQuery = reqBody.result.resolvedQuery;
    rb.contexts = reqBody.result.contexts;
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
    subscribe,
    setSpeechResponseAuthority,
    newRequest,
};