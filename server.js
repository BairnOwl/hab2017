/**
 * Created by bairnowl on 2/4/17.
 */

var express = require('express');
var app = express();

var http = require('http');

var engines = require('consolidate');
app.engine('html', engines.hogan);
app.set('views', __dirname + '/templates');
app.use(express.static('public'));

var server = http.createServer(app);

app.get('/', function (req, res) {
    res.render('index.html');
});

server.listen(process.env.PORT, function () {
    console.log('hab2017 app listening on port ' + process.env.PORT);
});