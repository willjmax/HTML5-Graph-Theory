var canvas;
var context;
var rect;
var graph;
var mousedownVertex;
var mouseupVertex;
var vertexWidth = 12;
var vertexHeight = 12;
var makingEdge = false;

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

function addListeners() {
	canvas.addEventListener('mouseup', onMouseUp);
	canvas.addEventListener('mousedown', onMouseDown);
}

function onLoad() {
	graph = new Graph();
	canvas = createHiDPICanvas(500, 500);
	document.body.appendChild(canvas);
	context = document.getElementById("canvas").getContext("2d");
	addListeners();
}


function onMouseDown(event) {
	if (isVertexClicked(event)) {
		makingEdge = true;
	}
}

function onMouseUp(event) {
	if(!isVertexClicked(event)) {
		addVertex(event);
	} else if (isVertexClicked(event) && makingEdge) {
		addEdge(mousedownVertex, mouseupVertex);
	}
}

function isVertexClicked(event) {
	var pos = getMousePos(event);
	var inVertex = false;
	for (x = 0; x < graph.vertices.length; x++) {
		inVertex = pos.x <= graph.vertices[x].pos.x + 2*vertexWidth &&
				   pos.x >= graph.vertices[x].pos.x - vertexWidth &&
				   pos.y <= graph.vertices[x].pos.y + 2*vertexHeight &&
				   pos.y >= graph.vertices[x].pos.y - vertexHeight;
		if (inVertex) {
			if (event.type == "mousedown") {
					mousedownVertex = graph.vertices[x];
					console.log("down");
				}
			if (event.type == "mouseup") {
				mouseupVertex = graph.vertices[x];
				console.log("up");
			}
			break;
		}
	}
	return inVertex;
}

function addVertex(event) {
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

function addEdge(vertex1, vertex2) {
	makingEdge = false;
	var moveToX = vertex1.pos.x + vertexWidth/2;
	var moveToY = vertex1.pos.y + vertexWidth/2;
	var lineToX = vertex2.pos.x + vertexWidth/2;
	var lineToY = vertex2.pos.y + vertexWidth/2;
	context.beginPath();
	context.moveTo(moveToX, moveToY);
	context.lineTo(lineToX, lineToY);
	context.stroke();
}

function getMousePos(event) {
	var rect = canvas.getBoundingClientRect();
	var x = (event.clientX - rect.left)/(rect.right - rect.left)*canvas.width;
	var y = (event.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height;
	return { x: x, y: y}
}

window.onload = onLoad;