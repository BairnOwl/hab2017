'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000, host: 'localhost' });

// USER ROUTES
server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: function (request, reply) {
      reply("It good")
    }
});

server.route({
  method: 'POST',
  path: '/users',
  handler: function (request, reply) {
    reply("Success!")
  }
});

server.route({
  method: 'PUT',
  path: '/users/{id}',
  handler: function (request, reply) {
    reply("Success!")
  }
});

// STORY ROUTES

server.route({
  method: 'POST',
  path: '/users/{id}/stories',
  handler: function (request, reply) {
    reply("Success!")
  }
});


// CHARACTER ROUTES

server.route({
  method: 'GET',
  path: '/users/{id}/stories/{storyId}/characters/{charId}'
  handler: function (request, reply) {
    reply("Success!")
  }
});

server.route({
  method: 'POST',
  path: '/users/{id}/stories/{storyId}/characters',
  handler: function (request, reply) {
    reply("Success!")
  }
});

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
