const DecisionModel = require("./DecisionModel");
const preemptiveActions = require("./PreemptiveActions").preemptiveActions;

function YesNoDecision(responseCallback) {
    this.responseCallback = responseCallback;
    
    this.input = function (meta) {
        var decision;

        if(meta.requestBody.action === 'decision.yes'){
            decision = new DecisionModel.Decision(DecisionModel.DecisionResultTypes.yesNo, {result: true});
        } else if(meta.requestBody.action === 'decision.no'){
            decision = new DecisionModel.Decision(DecisionModel.DecisionResultTypes.yesNo, {result: false});
        } else if(preemptiveActions.includes(meta.requestBody.action)){
            decision = new DecisionModel.Decision(DecisionModel.DecisionResultTypes.subjectChange, meta);
        } else{
            decision = new DecisionModel.Decision(DecisionModel.DecisionResultTypes.unknown, {});
        }

        this.responseCallback(decision, meta);
    }
    
}

module.exports = {
    YesNoDecision
};