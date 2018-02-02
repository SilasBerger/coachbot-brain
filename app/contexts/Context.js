const DefaultContext = require("./DefaultContext");

exports.passContext = function(requestBody, responsePayload, responseObject, newContext){
    requestBody.user.mainContext = newContext;
    requestBody.user.mainContext.input(requestBody, responsePayload, responseObject);
};

exports.backToDefault = function (requestBody, responsePayload, responseObject) {
    requestBody.user.mainContext = new DefaultContext.DefaultContext();
};