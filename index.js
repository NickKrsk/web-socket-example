var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  console.log('connection');
  io.emit('connection', 'connection');

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
    io.emit('disconnected', 'disconnected');
 });

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
