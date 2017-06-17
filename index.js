/*===============================
        EXPRESS SETUP
================================*/

const app = require('express')();
const http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*------ listen on 8080 ------*/
http.listen(8080, function(){
  console.log('listening on port 8080');
})


