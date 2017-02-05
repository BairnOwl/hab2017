/**
 * Created by bairnowl on 2/4/17.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var http = require('http');

var engines = require('consolidate');
app.engine('html', engines.hogan);
app.set('views', __dirname + '/templates');
app.set('view engine', engines.hogan);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

//app.set('view engine', 'html');
//app.engine('html', require('hogan-express'));

var server = http.createServer(app);

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/user/home', function (req, res) {
    res.render('user-home.html');
});

// app.get('/bower_components/:folder/:file', function (req, res) {
//     res.render('bower_components/' + req.params.folder+'/'+req.params.file);
// });

// USER ROUTES

// Creates a new user
app.post('/create/user/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var j = {
        "username": username,
        "password": password
    };

    var url = 'http://localhost:3000/users';

    // connect to database
    var request = new XMLHttpRequest();
    request.open('POST', url, true);

    request.addEventListener('load', function(e) {
        if (request.status == 200) {
            var data = JSON.parse(request.responseText);
            res.render('user-home.html', { userId: data._id });
        }
    }, false);

    request.send(JSON.stringify(j));
});

// Gets info for a specific user
app.get('/view/user/:userId', function(req, res) {

    var userId = req.params.userId;
    var j = {
        "userId": userId
    };

    var url = '/users/' + userId;

    // connect to database
    var request = new XMLHttpRequest();
    request.open('POST', url, true);

    request.addEventListener('load', function(e){
        if (request.status == 200) {
            var data = JSON.parse(request.responseText);
            res.json(data);
        }
    }, false);

    request.send(JSON.stringify(j));
});


// STORY ROUTES

// Creates a new story
app.post('/create/story/', function(req, res) {

    var userId = req.body.userId;
    var title = req.body.title;
    
    var j = {
      "title": title  
    };

    var url = 'http://localhost:3000/users/' + userId + '/stories';
    console.log(url);

    // connect to database
    var request = new XMLHttpRequest();
    request.open('POST', url, true);

    request.addEventListener('load', function(e) {
        console.log('loaded');
        if (request.status == 200) {
            var data = JSON.parse(request.responseText);
            console.log(data);
            res.json(data);
        }
    }, false);

    request.send(JSON.stringify(j));
});

// Gets a user's stories
app.get('/view/user/:userId/stories', function(req, res) {
    var userId = req.params.userId;

    var url = '/users/' + userId + '/stories';

    // connect to database
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.addEventListener('load', function(e){
        if (request.status == 200) {
            var data = JSON.parse(request.responseText);
            res.json(data);
        }
    }, false);

    request.send(null);
});

// Gets a specific story from a user
app.get('/view/user/:userId/stories/:storyId', function(req, res) {
    var userId = req.params.userId;
    var storyId = req.params.storyId;

    var url = '/users/' + userId + '/stories/' + storyId;

    // connect to database
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.addEventListener('load', function(e){
        if (request.status == 200) {
            var data = JSON.parse(request.responseText);
            res.json(data);
        }
    }, false);

    request.send(null);
});

// CHARACTER ROUTES

// Create character and request questions from database for character creation
app.post('/create/character/', function(request, response) {
    var storyId = request.body.storyId;
    var numQs = request.body.numQs;
    var title = request.body.title;

    var url = '/stories/' + storyId + '/character';

    var j = {
        "title": title,
        "numQs": numQs
    };

    // connect to database
    var req = new XMLHttpRequest();
    req.open('POST', url, true);

    req.addEventListener('load', function(e){
        if (req.status == 200) {
            var data = JSON.parse(req.responseText);
            res.json(data);
        }
    }, false);

    request.send(JSON.stringify(j));
});

// Send answers to database for character creation
app.post('/create/character/submit', function(request, response) {
    var userId = request.body.userId;
    var questions = request.body.questions;
    var storyId = request.body.storyId;
    var charId = request.body.charId;

    var j = {
        "questions": questions
    };

    var url = '/users/' + userId + '/stories/' + storyId + '/characters/' + charId;

    // connect to database
    var req = new XMLHttpRequest();
    req.open('PUT', url, true);

    req.addEventListener('load', function(e){
        if (req.status == 200) {
            var data = JSON.parse(req.responseText);
            response.json(data);
        }
    }, false);

    req.send(JSON.stringify(j));
});

// Gets a character's profile and info
app.get('/view/user/:userId/stories/:storyId/character/:characterId', function(request, response) {

    var userId = request.params.userId;
    var storyId = request.params.storyId;
    var characterId = request.params.characterId;
    
    var url = '/users/' + userId + '/stories/' + storyID + '/characters/' + characterId;

    // connect to database
    var req = new XMLHttpRequest();
    req.open('GET', url, true);

    req.addEventListener('load', function(e){
        if (req.status == 200) {
            var data = JSON.parse(req.responseText);
            res.json(data);
        }
    }, false);

    req.send(null);
});


server.listen(process.env.PORT, function () {
    console.log('hab2017 app listening on port ' + process.env.PORT);
});