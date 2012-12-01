var http = require('http');
var url = require("url");
var io = require("socket.io");

var numConnected = 0;

function start(route, handle) {

	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handle, pathname, response, request);
	}
	
	var httpServer = http.createServer(onRequest).listen(8081);
	console.log('Node.js is now listening on port 8081');
	var socketServer = io.listen(httpServer);

	// Socket.io listeners
	socketServer.sockets.on("connection", function(socket) {
		numConnected++;
		console.log("Users connected: " + numConnected);
		socket.emit("updateConnected", numConnected);
		// Update all other users to show new connection
		socket.broadcast.emit("updateConnected", numConnected);

		socket.on("checking the mic", function(text) {
			console.log(text);
		});
		socket.on("disconnect", function() {
			numConnected--;
			socket.broadcast.emit("updateConnected", numConnected);
		});
	});
}
exports.start = start;
