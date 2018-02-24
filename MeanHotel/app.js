require('./api/data/db.js');//connects with the database through mongoose required in the db.js file.
var express = require('express');//require express
var app = express();//initialize express.
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes');//get the routes from the /api/routes/index.js folder under Lecture12

app.set('port', process.env.PORT); //sets port property for entire app

//add middleware to console log every request.
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

//Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));//static folder
app.use('/node_modules', express.static(__dirname + '/node_modules'));

//enable parsing of posted forms
app.use(bodyParser.urlencoded({extended : false}));//urlencoded is the method used for sending html posted forms.
app.use(bodyParser.json());//tell the backend api to understand the native json data, since angular does not use url encoding while sending form data(Lecture 48) 
//add routes
app.use('/api', routes);

//listen for requests
var server = app.listen(app.get('port'), function() {//app.get retrieves the port variable
    var port = server.address().port;//to extract the port number from the object.
    console.log("Magic happens on Port ..."+ port);
});


