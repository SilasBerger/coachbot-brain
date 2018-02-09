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
        var randomIndex = Math.floor(Math.random() * this.functions.length);
        var fun = this.functions[randomIndex];
        this.functions.splice(randomIndex, 1);
        return fun;
    }

};