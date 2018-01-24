exports.SynonymBox = function() {

    this.synonyms = [];

    this.add = function (synonym) {
        this.synonyms.push(synonym);
    };

    this.get = function () {
        var randomIndex = Math.floor(Math.random() * this.synonyms.length);
        return this.synonyms[randomIndex];
    };

};