/*===============================
        EXPRESS SETUP
================================*/

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


/*------ log "a user connected"-------*/
io.on('connection', function(socket){
  console.log('a user connected');
  /*------ log "user disconnected"----*/
  socket.on('disconnect', function(){
    console.log('user disconnected');
  })
});

/*----- print chat message event -----*/
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

/*------- emit message to channel ---*/
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
/*------ listen on 8080 ------*/
http.listen(8080, function(){
  console.log('listening on port 8080');
})

