/*===============================
        EXPRESS SETUP
================================*/
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const env = require('dotenv').config();

/*==============================
          WATSON
===============================*/
const watson = require('watson-developer-cloud');
const language_translator = watson.language_translator({
  url: "https://gateway.watsonplatform.net/language-translator/api",
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  version: "v2"
});

const translate = function (msg, callback) {
    language_translator.translate({
    text: msg,
    source: "en",
    target: "es",
  }, function(err, translation) {
    let output;
    if (err){
      output = "error";
      console.log(output);
      callback(err);
    }
    else {
      output = (translation.translations[0].translation);
      callback(null, output);
    }
  });
};

/*================================
          ROUTES
================================*/
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*================================
          CHAT SERVER
================================*/

/*------ log "a user connected"-------*/
io.on('connection', function(socket){
  console.log('a user connected');
  /*------ log "user disconnected"----*/
  socket.on('disconnect', function(){
    console.log('user disconnected');
  })
});

/*------- emit message to channel ---*/
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    translate(msg, function (err, output) {
      if (err) {
        console.log('error')
        return;
      } else {
      io.sockets.emit('chat message', output);
      }
    });
  });
});

/*------ listen on 8080 ------*/
http.listen(8080, function(){
  console.log('listening on port 8080');
})

