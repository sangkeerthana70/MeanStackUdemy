var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

//using these functions as a API route
module.exports.register = function(req, res) {
    console.log('registering user'); 
    
    var username = req.body.username;
    var name = req.body.name || null;//if req.body.name is there then set it otherwise set it to null.
    var password = req.body.password;
    
    //create a user in our database.
    User.create({
        username: username,
        name: name,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }, function (err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        }
        else {
            console.log('user created', user);
            res.status(201).json(user);
        }
    });

};

module.exports.login = function(req, res) {
   console.log('logging in user');
   var username = req.body.username;
   var password = req.body.password;
   
   User.findOne({
       username: username
   }).exec(function(err, user) {
       if (err) {
           console.log(err);
           res.status(400).json(err);
       }
       else {
           if (bcrypt.compareSync(password, user.password)) {
               console.log('User found', user);
               var token = jwt.sign({ username: user.username }, 's3cr3t', { expiresIn: 3600 });
               res.status(200).json({success: true, token: token});
           }
           else {
               res.status(401).json('Unauthorized');
           }
       }  
   });
};

module.exports.authenticate = function(req, res, next) {
    var headerExists = req.headers.authorization;//make sure the request object has an authorization header property.
    if (headerExists) {
        var token = req.headers.authorization.split(' ')[1];//get the authorization header from the request and split it.
        jwt.verify(token, 's3cr3t', function(error, decoded) {
           if (error) {
              console.log(error);
              res.status(401).json('Unauthorized');//if error or if token can no longer be validated.
           }
           else {//add property to the request object inside the  express js middleware function which we can access later.
               req.user = decoded.username;//decoded is the decoded token which comes from the payload property in the above login function line-47.
               next();//goes to the next function in index.js ctrlHotels.hotelsGetAll
           }
        });
    }
    else {
        res.status(403).json('No token provided');
    }
};