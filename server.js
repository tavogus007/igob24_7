var compression = require('compression');
var express = require('express'),
    io = require('socket.io'),
    http = require('http'),
	  app = express(),
    server = http.createServer(app),
    io = io.listen(server);  
    app.use(compression());
    app.use('/', express.static(__dirname + '/AngularFrontEnd'));
    server.listen(3082);
    io.on('connection', function(socket){
      socket.on('message', function(msg){
        io.emit('message', msg);
      });
    });
console.log("Server up 3082 !");