exports.FunctionBox = function() {

    this.functions = [];

    this.add = function (synonym) {
        this.functions.push(synonym);
    };

    this.get = function () {
        var randomIndex = Math.floor(Math.random() * this.functions.length);
        return this.functions[randomIndex];
    };

    this.pop = function () {
        //var randomIndex = Math.floor(Math.random() * this.functions.length);
        var randomIndex = 0; //hack for debugging, TODO: remove
        var fun = this.functions[randomIndex];
        this.functions.splice(randomIndex, 1);
        return fun;
    };

    this.hasNext = function () {
        return this.functions.length > 0;
    }

};