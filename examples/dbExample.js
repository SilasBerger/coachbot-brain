// require mongoose ODM
const mongoose = require('mongoose');

//require the dbconf.js module, which provides config and config in an object called config
const dbConfig = require('../dbconf').config;

//connect to DB using dbconf.js
mongoose.connect("mongodb://" + dbConfig.username + ":" + dbConfig.password + "@" + dbConfig.host + ":" + dbConfig.port + "/" + dbConfig.dbName);

//get and check connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB");
});

//define a document schema
var userSchema = mongoose.Schema({
    name: String,
    role: String,
    mood: String
});

// compile schema to model, give it a collection name
var User = mongoose.model('User', userSchema);


function saveExampleUser() {
    saveNewUser("Jon Doe", "admin", "happy");
}

function saveNewUser(name, role, mood) {
    // create an instance of the schema
    var newUser = new User({name: name, role: role, mood: mood});

    // Save new user to db
    newUser.save(function (err, newUser) {
        if(err){
            console.log(err);
            return;
        }
        console.log(newUser);
    });
}


function findAllUsers() {
    // find all documents of the User schema (based on the collection name given above)
    User.find(function (err, users) {
        if(err){
            console.log(err);
            return;
        }
        console.log("Found users: ");
        console.log(users)
    });
}

module.exports = {
    saveExampleUser,
    saveNewUser,
    findAllUsers
};