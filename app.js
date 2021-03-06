
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var quiz = require('./routes/quiz');

var app = express();
mongoose.connect(process.env.MONGOLAB_URI || 'localhost/civic-hack-day');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/help-a-friend', quiz.index);
app.post('/post-quiz', quiz.postQuiz);
app.get('/quiz/:_id', quiz.survey);
app.get('/viewall', quiz.viewAll);
app.post('/post-survey/:_id', quiz.postSurvey);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
