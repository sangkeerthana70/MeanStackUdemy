var express = require('express');//require express
var app = express();//initialize express.
var path = require('path');

app.set('port', process.env.PORT); //sets port property for entire app

app.use(express.static(path.join(__dirname, 'public')));//static folder
//app.use('/public', express.static(path.join(__dirname, 'public')));

var server = app.listen(app.get('port'), function() {//app.get retrieves the port variable
    var port = server.address().port;//to extract the port number from the object.
    console.log("Magic happens on Port ..."+ port);
});


