var server = require("./server");
var router = require("./router");
var handler = require("./handlers");

var handle = {};
handle["/"] = handler.index;
handle["js"] = handler.js;
handle["css"] = handler.css;
handle["png"] = handler.png;

server.start(router.route, handle);