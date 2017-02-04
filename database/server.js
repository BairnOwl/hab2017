'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const Question = require('./models/Question.js');
const Character = require('./models/Character.js');
const Story = require('./models/Story.js');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000, host: process.env.HOST || 'localhost' });

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/test');

// USER ROUTES

// GET A SPECIFIC USER
server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: function (request, reply) {
      reply("It good")
    }
});

// CREATE A NEW USER
// send json as follows:
/*
  {
    "username" : "Joe Smith",
    "password" : "pass",
  }
*/
server.route({
  method: 'POST',
  path: '/users',
  handler: function (request, reply) {
    reply("Success!")
  }
});

// UPDATE USER'S STORIES
// ADD STORY ID
// send json as follows:
/*
  {
    "storyId" : XX
  }
*/
// OVERWRITE STORY IDS
// send json as follows:
/*
  {
    "storyIds" : [XX, YY, ...]
  }
*/
server.route({
  method: 'PUT',
  path: '/users/{id}',
  handler: function (request, reply) {
    reply("Success!")
  }
});

// STORY ROUTES
// GET ALL STORIES FOR A GIVEN USER
server.route({
  method: 'GET',
  path: '/users/{id}/stories',
  handler: function (request, reply) {
    reply("Success!")
  }
});

// STORY ROUTES
// GET A SPECIFIC STORY FOR A GIVEN USER
server.route({
  method: 'GET',
  path: '/users/{id}/stories/{storyId}',
  handler: function (request, reply) {
    reply("Success!")
  }
});

// CREATE NEW STORY FOR A GIVEN USER
// send json as follows:
/*
  {
    "title" : "My novel"
  }
*/
server.route({
  method: 'POST',
  path: '/users/{id}/stories',
  handler: function (request, reply) {
    reply("Success!")
  }
});

// UPDATE A SPECIFIC STORY FOR A GIVEN USER
// ADD CHARACTER ID
// send json as follows:
/*
  {
    "title" : "My new novel" (optional),
    "characterId" : XX
  }
*/
// OVERWRITE CHARACTER IDS
// send json as follows:
/*
  {
    "title" : "My new novel" (optional),
    "characterIds" : [XX, YY, ...]
  }
*/
server.route({
  method: 'PUT',
  path: '/users/{id}/stories/{storyId}',
  handler: function (request, reply) {
    reply("Success!")
  }
});


// CHARACTER ROUTES

// GET ALL CHARACTERS FOR A GIVEN STORY AND USER
server.route({
  method: 'GET',
  path: '/users/{id}/stories/{storyId}/characters',
  handler: function (request, reply) {
    reply("Success!")
  }
});

// GET A SPECIFIC CHARACTER FOR A GIVEN STORY AND USER
server.route({
  method: 'GET',
  path: '/users/{id}/stories/{storyId}/characters/{charId}',
  handler: function (request, reply) {
    reply("Success!")
  }
});

// CREATE NEW CHARACTER FOR A GIVEN STORY AND USER
// send json as follows:
/*
  {
    "title" : "Man in Black",
    "numQs" : XX
  }
*/
server.route({
  method: 'POST',
  path: '/users/{id}/stories/{storyId}/characters',
  handler: function (request, reply) {
    reply("Success!")
  }
});

// UPDATE A SPECIFIC CHARACTER FOR A GIVEN STORY AND USER
// ADD A QUESTION TO A GIVEN CHARACTER, STORY, AND USER
// send json as follows:
/*
  {
    "title" : "My new novel" (optional),
    "question" : {
      "questionId" : XX,
      "answerText" : "My answer"
    }
  }
*/
// OVERWRITE QUESTION IDS
// send json as follows:
/*
  {
    "title" : "My new novel" (optional),
    "questions" : [
      {
        "questionId" : XX,
        "answerText" : "My answer"
      }, ...
    ]
  }
*/
server.route({
  method: 'PUT',
  path: '/users/{id}/stories/{storyId}/characters/{charId}',
  handler: function (request, reply) {
    reply("Success!")
  }
});


//  Answer ROUTES
// GET ALL answered questions FOR A GIVEN CHARACTER
server.route({
  method: 'GET',
  path: '/users/{id}/stories/{storyId}/characters/{charId}/answers',
  handler: function (request, reply) {
    reply("Success!")
  }
});

// GET A SPECIFIC {Question, Answer} pair FOR A GIVEN Character and Question
server.route({
  method: 'GET',
  path: '/users/{id}/stories/{storyId}/characters/{charId}/answers/{questId}',
  handler: function (request, reply) {
    reply("Success!")
  }
});

//Question ROUTES

// GET ALL questions
server.route({
  method: 'GET',
  path: '/questions',
  handler: function (request, reply) {
    reply("Success!")
  }
});

// GET A SPECIFIC Question
server.route({
  method: 'GET',
  path: '/questions/{questId}',
  handler: function (request, reply) {
    reply("Success!")
  }
});

// CREATE NEW Question
// send json as follows:
/*
  {
    "questText" : "What color . . . ?"
  }
*/
server.route({
  method: 'POST',
  path: '/questions',
  handler: function (request, reply) {
    reply("Success!")
  }
});

// UPDATE A Question
// CHANGE TEXT
// send json as follows:
/*
  {
    "questText" : "My new question?"

  }
*/
server.route({
  method: 'PUT',
  path: '/questions/{questId}',
  handler: function (request, reply) {
    reply("Success!")
  }
});


server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
