const DefaultContext = require("./DefaultContext");

exports.passContext = function(meta, newContext){
    meta.requestBody.user.mainContext = newContext;
    meta.requestBody.user.mainContext.input(meta);
};

exports.backToDefault = function (meta) {
    meta.requestBody.user.mainContext = new DefaultContext.DefaultContext();
};