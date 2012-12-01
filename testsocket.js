// server.js
var app = require('http').createServer(handler)
  , io = require('socket.io')
  , fs = require('fs')

// Start an HTTP server on port 8080
app.listen(8080);
var test = io.listen(app);
function handler(req, res) {
    // Hardcode *all* HTTP requests to this server to serve up index.html
    fs.readFile(
        __dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        }
    );
}

// After any socket connects, SEND it a custom 'news' event
test.sockets.on(
    'connection',
    function (socket) {
        socket.emit('news', {hello: 'world'});
    }
);
