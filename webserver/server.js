var http = require("http");
var url = require("url");

function start(route, handle) {
    http.createServer(function(req, res) {
        var pathname = url.parse(req.url).pathname;
        route(pathname, handle, res);
    }).listen(8080);
}

exports.start = start;