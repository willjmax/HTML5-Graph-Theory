var offsetLeft;
var offsetTop;
var canvas;
var context;
var rect;
var graph;
var vertexWidth = 12;
var vertexHeight = 12;

var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();

createHiDPICanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
	can.setAttribute("id", "canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
}

function onLoad() {
	graph = new Graph();
	canvas = createHiDPICanvas(500, 500);
	document.body.appendChild(canvas);
	offsetLeft = canvas.offsetLeft;
	offsetTop = canvas.offsetTop;
	canvas.addEventListener('click', canvasClick);
}

function isVertexClicked(event) {
	var pos = getMousePos(event);
	var inVertex = false;
	for (x = 0; x < graph.vertices.length; x++) {
		inVertex = pos.x <= graph.vertices[x].x + 2*vertexWidth &&
				   pos.x >= graph.vertices[x].x - vertexWidth &&
				   pos.y <= graph.vertices[x].y + 2*vertexHeight &&
				   pos.y >= graph.vertices[x].y - vertexHeight;
		if (inVertex) {
			break;
		}
	}
	return inVertex;
}

function canvasClick(event) {
	if(isVertexClicked(event)) {
		//stuff
	} else {
		addVertex(event);
	}
}

function addVertex(event) {
	var context = document.getElementById("canvas").getContext("2d");
	var pos = getMousePos(event);
	var x = pos.x - vertexWidth/2;
	var y = pos.y - vertexHeight/2;
	var drawing = new Image();
	drawing.src = "vertex.png";
	drawing.onload = function() {
		context.drawImage(drawing, x, y);
	}
	graph.addVertex({ x: x, y: y});
}

function getMousePos(event) {
	var rect = canvas.getBoundingClientRect();
	var x = (event.clientX - rect.left)/(rect.right - rect.left)*canvas.width;
	var y = (event.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height;
	return { x: x, y: y}
}

window.onload = onLoad;