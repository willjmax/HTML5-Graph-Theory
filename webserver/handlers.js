var fs = require("fs");

function index(res) {
    var html = "../frontend/main.html";
    fs.readFile(html, function(err, contents) {
        if (!err) {
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.end(contents);
        } else {
            console.log("error")
        }
    })
};

function js(file, res) {
    var script = "../frontend/" + file;
    fs.readFile(script, function(err, contents) {
       if (!err) {
           res.writeHeader(200, {"Content-Type": "application/javascript"});
           res.end(contents);
       } else {
           console.log("error");
       }
    });
}

function css(file, res) {
    var script = "../frontend/" + file;
    fs.readFile(script, function(err, contents) {
        if (!err) {
            res.writeHeader(200, {"Content-Type": "text/css"});
            res.end(contents);
        } else {
            console.log("error");
        }
    });
}


function png(file, res) {
    var image = "../frontend/" + file;
    fs.readFile(image, function(err, contents) {
        if (!err) {
            res.writeHeader(200, {"Content-Type": "image/png"});
            res.end(contents);
        } else {
            console.log("error");
        }
    });
}

exports.index = index;
exports.js = js;
exports.css = css;
exports.png = png;