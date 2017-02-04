'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000, host: 'localhost' });

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
// GET A SPECIFIC STORIES FOR A GIVEN USER
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
  path: '/users/{id}/stories/{storyId}/characters'
  handler: function (request, reply) {
    reply("Success!")
  }
});

// GET A SPECIFIC CHARACTER FOR A GIVEN STORY AND USER
server.route({
  method: 'GET',
  path: '/users/{id}/stories/{storyId}/characters/{charId}'
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
  path: '/users/{id}/stories/{storyId}/characters/{charId}'
  handler: function (request, reply) {
    reply("Success!")
  }
});


//  QUESTION ROUTES

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
