var canvas;
var context;
var graph;
var mousedownVertex;
var mouseupVertex;
var selectedEdge;
var makingEdge = false;
var movingVertex = false;
var addingWeight = false;

PIXEL_RATIO = function () {
    var ctx = document.createElement("canvas").getContext("2d"),
    dpr = window.devicePixelRatio || 1,
    bsr = ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
}

createHiDPICanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO(); }
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
	var dimensions = getWindowSize();
	var width = dimensions.width;
	var height = dimensions.height;
	canvas = createHiDPICanvas(width * 0.70, height);
	document.getElementById("canvasContainer").appendChild(canvas);
	context = document.getElementById("canvas").getContext("2d");
	addListeners();
}

function onResize() {
	var dimensions = getWindowSize();
	var width = dimensions.width;
	var height = dimensions.height;
	var newcanvas = createHiDPICanvas(width * 0.70, height);
	document.getElementById("canvasContainer").replaceChild(newcanvas, canvas);	
	canvas = newcanvas;
	context = document.getElementById("canvas").getContext("2d");
	addListeners();
	graph.draw(canvas, context);
}

function onMouseDown(event) {
	if (graph.isVertexClicked(event)) {
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
	var pos = getMousePos(event);
	if(movingVertex) {	
		graph.vertices[mousedownVertex.id].pos = {x: pos.x, y: pos.y };
		graph.draw(canvas, context);
	}
	if(makingEdge) {
		graph.draw(canvas, context)
		context.beginPath();
		context.moveTo(graph.vertices[mousedownVertex.id].pos.x, graph.vertices[mousedownVertex.id].pos.y);
		context.lineTo(pos.x, pos.y);
		context.lineWidth = 2;
		context.stroke();		
	}
}

function leftClick(event) {
	if(!graph.isVertexClicked(event) && !movingVertex && !makingEdge && !graph.isEdgeClicked(event) && !addingWeight) {
		var pos = getMousePos(event);
		graph.addVertex(new Vertex({x: pos.x, y: pos.y}));
	} else if (addingWeight) {
		addingWeight = false;
		var weightDiv = document.getElementById("weightDiv");
		var weight = document.getElementById("weight");
		weight.blur();
		graph.edges[selectedEdge].weight = parseInt(weight.value);
		graph.checkWeights();
		weight.value = "";
		weightDiv.style.display = "none";
	} else if (graph.isVertexClicked(event) && makingEdge) {
		makingEdge = false;
		graph.addEdge(new Edge({vertex1: mousedownVertex, vertex2: mouseupVertex}));
	} else if (makingEdge) {
		makingEdge = false;
	} else if ((selectedEdge = graph.isEdgeClicked(event)) && !graph.isVertexClicked(event)) {
		addingWeight = true;
		var weightDiv = document.getElementById("weightDiv");
		var weight = document.getElementById("weight");
		weightDiv.style.display = "block";
		weightDiv.style.top = event.pageY;
		weightDiv.style.left = event.pageX;
		weight.focus();
	}
}

function rightClick(event) {
	var vertex = graph.isVertexClicked(event);
	var edge = graph.isEdgeClicked(event);
	if (vertex > 0) {
		graph.removeVertex(vertex);
	}
	if (edge > 0 && vertex == 0) {
		graph.removeEdge(edge);
	}
}

function getMousePos(event) {
	var rect = canvas.getBoundingClientRect();
	var x = (event.clientX - rect.left)/(rect.right - rect.left)*canvas.width;
	var y = (event.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height;
	return { x: x, y: y}
}

function getWindowSize() {
	return {width: window.innerWidth, height: window.innerHeight};
}

window.onload = onLoad;
window.onresize = onResize;