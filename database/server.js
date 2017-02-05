const Hapi = require('hapi');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const Question = require('./models/Question.js');
const Character = require('./models/Character.js');
const Story = require('./models/Story.js');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000,
                    host: process.env.HOST || 'localhost' });

mongoose.connect(process.env.MONGO_URL || 'mongodb://hab2017:hab2017@ds049624.mlab.com:49624/coledev');

let db = mongoose.connection;

//server.

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!

  // USER ROUTES

  // GET A SPECIFIC USER
  server.route({
      method: 'GET',
      path: '/users/{id}',
      handler: function (request, reply) {
        User.findById(request.params.id, (err, user) => {
          if (err) {
            throw err;
          } else{
            reply(user.toJSON());
          }
        })
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

      var body = JSON.parse(request.payload);

      let newUser = new User({username: body.username, password: body.password});

      console.log(body);
      console.log(body.username);

      newUser.save((err, user) => {
        if (err) {
          throw err;
        } else {
          reply(user.toJSON());
        }
      });
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
      var id = request.params.id;
      console.log(request.params.id);
      if (request.payload && request.payload.storyId) {
        User.findById(id, (err, user) => {
          if (err) {
            throw err;
          } else {
            user.storyIds.push(request.payload.storyId);
            user.save((err, user) => {
              if (err) {
                throw err;
              } else {
                reply(user.toJSON());
              }
            })
          }
        })
      } else if (request.payload && request.payload.storyIds) {
        User.findById(id, (err, user) => {
          if (err) {
            throw err;
          } else {
            user.storyIds = request.payload.storyIds;
            user.save((err, user) => {
              if (err) {
                throw err;
              } else {
                reply(user.toJSON());
              }
            })
          }
        })
      } else {
        throw new Error("bad data");
      }
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
      let newStory = new Story({title: "Love Life"});
      newStory.save((err, story) => {
        if (err) {
          throw err;
        } else {
          let req = {
            method: 'PUT',
            url: `/users/${request.params.id}`,
            payload: JSON.stringify({'storyId': story.id})
          }
          server.inject(req, (res) => {
            if (res.statusCode == 200) {
              reply(story.toJSON())
            } else {
              reply(res)
            }
          })
        }
      });
    }
  });

  // STORY ROUTES
  // GET ALL STORIES FOR A GIVEN USER
  server.route({
    method: 'GET',
    path: '/users/{id}/stories',
    handler: function (request, reply) {
      User.findById(request.params.id, (err, user) => {
        if (err) {
          throw err;
        } else{
          let stories = user.storyIds.map((sid) => {
            return Story.findById(sid)
          })
          reply(stories.toJSON());
        }
      })
    }
  });

  // STORY ROUTES
  // GET A SPECIFIC STORY FOR A GIVEN USER
  server.route({
      method: 'GET',
      path: '/users/{id}/stories/{storyId}',
      handler: function (request, reply) {
        Story.findById(request.params.storyId, (err, story) => {
          if (err) {
            throw err;
          } else{
            reply(story.toJSON());
          }
        })
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
      Story.findById(request.params.storyId, (err, story) => {
        if (err) {
          throw err;
        } else{
          let chars = story.chars.map((cid) => {
            return Character.findById(cid)
          })
          reply(chars.toJSON());
        }
      })
    }
  });

  // GET A SPECIFIC CHARACTER FOR A GIVEN STORY AND USER
  server.route({
      method: 'GET',
      path: '/users/{id}/stories/{storyId}/characters/{charId}',
      handler: function (request, reply) {
        Character.findById(request.params.charId, (err, char) => {
          if (err) {
            throw err;
          } else{
            reply(char.toJSON());
          }
        })
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
      let newChar = new Character({title: "Mystery Man", questionAnswer: []});
      newChar.save((err, char) => {
        if (err) {
          throw err;
        } else {
          let req = {
            method: 'PUT',
            url: '/users/{id}/stories/{StoryId}',
            payload: JSON.stringify({'charId': char.id})
          }
          server.inject(req, (res) => {
            if(res.statusCode == 200){
              reply(char.toJSON())
            }else{
              reply(res)
            }
          })
        }
      });
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
    //TODO
      method: 'PUT',
      path: '/users/{id}/stories/{storyId}/characters/{charId}',
      handler: function (request, reply) {
        Character.findById(request.params.id, (err, char) => {
          if (err) {
            throw err;
          } else{
            reply(char.toJSON());
          }
        })
      }
  });



  //  Answer ROUTES
  // GET ALL answered questions FOR A GIVEN CHARACTER
  server.route({
    method: 'GET',
    path: '/users/{id}/stories/{storyId}/characters/{charId}/answers',
    handler: function (request, reply) {
      Character.findById(request.params.charId, (err, char) => {
        if (err) {
          throw err;
        } else{
          reply(char.questionAnswer.toJSON());
        }
        }
      )
    }
  });
  //??????

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
        Question.findById(request.params.id, (err, quest) => {
          if (err) {
            throw err;
          } else{
            reply(quest.toJSON());
          }
        })
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
      let newQuest = new Question({questText: "Do you like yourself?", isStandard: true, weight: 0});
      newQuest.save((err, quest) => {
        if (err) {
          throw err;
        } else {
          reply(quest.toJSON());
        }
      });
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
});
