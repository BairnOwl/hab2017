'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000, host: 'localhost' });

// USER ROUTES
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply("It good")
    }
});

server.route({
  method: 'GET',
  path: '/create/{name}',
  handler: function (request, reply) {
    data.push({"name" : request.params.name});
    reply("Success!")
  }
})

// STORY ROUTES


// CHARACTER ROUTES


//  QUESTION ROUTES

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
