const DecisionModel = require("./DecisionModel");
const preemptiveActions = require("./PreemptiveActions").preemptiveActions;

function YesNoDecision(responseCallback) {
    this.responseCallback = responseCallback;
    
    this.input = function (requestBody, responsePayload, responseObject) {
        var decision;

        if(requestBody.action === 'decision.yes'){
            decision = new DecisionModel.Decision(DecisionModel.DecisionResultTypes.yesNo, {result: true});
        } else if(requestBody.action === 'decision.no'){
            decision = new DecisionModel.Decision(DecisionModel.DecisionResultTypes.yesNo, {result: false});
        } else if(preemptiveActions.includes(requestBody.action)){
            decision = new DecisionModel.Decision(DecisionModel.DecisionResultTypes.subjectChange, requestBody);
        } else{
            decision = new DecisionModel.Decision(DecisionModel.DecisionResultTypes.unknown, {});
        }

        this.responseCallback(decision, requestBody, responsePayload, responseObject);
    }
    
}

module.exports = {
    YesNoDecision
};