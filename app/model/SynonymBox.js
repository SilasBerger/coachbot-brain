exports.SynonymBox = function() {

    this.synonyms = [];

    this.add = function (synonym) {
        this.synonyms.push(synonym);
    };

    this.get = function () {
        var randomIndex = Math.floor(Math.random() * this.synonyms.length);
        return this.synonyms[randomIndex];
    };

    this.pop = function () {
        var randomIndex = Math.floor(Math.random() * this.synonyms.length);
        var fun = this.synonyms[randomIndex];
        this.synonyms.splice(randomIndex, 1);
        return fun;
    };

    this.hasNext = function () {
        return this.functions.length > 0;
    }
};