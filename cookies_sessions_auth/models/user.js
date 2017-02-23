var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        // usernames should always be required
        required: true,
        // and most importantly unique! We will need to be able to uniquely
        // identify a user when we discuss logging in
        unique: true
    },
    password: {
        type: String,
        // passwords do not have to be unique, but we really need them to exist
        required: true
    }
});

// the callback function (2nd parameter below) accepts a parameter which we are calling "next". This is ALSO a callback function that needs to be executed when we would like to move on from this pre-save hook. If we do not invoke the "next" function, our server will hang.
userSchema.pre('save', function(next){
    // we do not want to lose the correct context of the keyword `this`, so let's cache it in a variable called user
    var user = this;
    // if the user's password has not been modified, do not continue with hashing their password....this is for updating a user. If a user does not update their password, do not create a new password hash!
    if (!user.isModified('password')) return next();

    // if the user has modified their password, let's hash it
    bcrypt.hash(user.password, 10).then(function(hashedPassword) {
        // then let's set their password to not be the plain text one anymore, but the newly hashed password
        user.password = hashedPassword
        // then we save the user in the db!
        next();
    }, function(err){
        // or we continue and pass in an error that has happened (which our express error handler will catch)
        return next(err)
    })
});

// now let's write an instance method for all of our user documents which will be used to compare a plain text password with a hashed password in the database. Notice the second parameter to this function is a callback function called "next". Just like the code above, we need to run next() to move on.
userSchema.methods.comparePassword = function(candidatePassword, next) {
    // when this method is called, compare the plain text password with the password in the database.
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return next(err);
        // isMatch is a boolean which we will pass to our next function
        next(null, isMatch);
    });
};

var User = mongoose.model('User', userSchema);
module.exports = User;