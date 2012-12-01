var http = require('http');
var url = require("url");
var io = require("socket.io");

function start(route, handle) {

	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handle, pathname, response, request);
	}
	
	var httpServer = http.createServer(onRequest).listen(8081);
	console.log('Node.js is now listening on port 8081');
	io.listen(httpServer);

	
}
exports.start = start;
