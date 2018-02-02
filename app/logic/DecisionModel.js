exports.Decision = function (decisionResultType, decisionResult) {
    this.decisionResultType = decisionResultType;
    this.decisionResult = decisionResult;
};

exports.DecisionResultTypes = {
    choice: 0,
    yesNo: 1,
    unknown: 2,
    subjectChange: 3
};