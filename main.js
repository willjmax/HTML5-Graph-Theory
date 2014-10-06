var canvas;
var context;
var graph;
var mousedownVertex;
var mouseupVertex;
var makingEdge = false;
var movingVertex = false;

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
	canvas.addEventListener('mousemove', onMouseMove);
	canvas.oncontextmenu = function (event) {
		event.preventDefault();
	};
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
		if (event.ctrlKey) {
			makingEdge = true;
		} else {
			movingVertex = true;
		}
	}
}

function onMouseUp(event) {
	if (event.which === 1) {
		leftClick(event);
	}
	if (event.which === 3) {
		rightClick(event);
	}
	graph.draw(canvas, context);
	movingVertex = false;
}

function onMouseMove(event) {
	if(movingVertex) {
		var pos = getMousePos(event);
		graph.vertices[mousedownVertex.id].pos = {x: pos.x, y: pos.y };
		graph.draw(canvas, context);
	}
}

function leftClick(event) {
	if(!isVertexClicked(event) && !movingVertex) {
		var pos = getMousePos(event);
		graph.addVertex(new Vertex({x: pos.x, y: pos.y}));
	} else if (isVertexClicked(event) && makingEdge) {
		makingEdge = false;
		graph.addEdge(new Edge({vertex1: mousedownVertex, vertex2: mouseupVertex}));
	}
}

function rightClick(event) {
	var vertex = isVertexClicked(event);
	if (vertex > 0) {
		graph.removeVertex(vertex);
	}
}

function isVertexClicked(event) {
	var pos = getMousePos(event);
	var inVertex = false;
	var clickedVertex = 0;
	for (x in graph.vertices) {
		inVertex = pos.x <= graph.vertices[x].pos.x + 2*Vertex.imgWidth &&
				   pos.x >= graph.vertices[x].pos.x - Vertex.imgWidth &&
				   pos.y <= graph.vertices[x].pos.y + 2*Vertex.imgHeight &&
				   pos.y >= graph.vertices[x].pos.y - Vertex.imgHeight;
		if (inVertex) {
			clickedVertex = x;
			if (event.type == "mousedown") {
				mousedownVertex = graph.vertices[x];
			}
			if (event.type == "mouseup") {
				mouseupVertex = graph.vertices[x];
			}
			break;
		}
	}
	return clickedVertex;
}

function getMousePos(event) {
	var rect = canvas.getBoundingClientRect();
	var x = (event.clientX - rect.left)/(rect.right - rect.left)*canvas.width;
	var y = (event.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height;
	return { x: x, y: y}
}

window.onload = onLoad;