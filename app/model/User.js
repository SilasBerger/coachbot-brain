const userList = [];

exports.User = function (userId) {
    this.userId = userId;
    this.mainContext = null;
    this.temporaryContext = null;
    userList.push(this);
};

exports.getUser = function (userId) {
    for(var i=0; i<userList.length; i++){
        if(userList[i].userId === userId){
            return userList[i];
        }
    }
    return null;
};