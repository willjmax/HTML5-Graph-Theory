function Graph() {
	this.vertices = { };
	this.edges = { };
}

Graph.prototype.addVertex = function(vertex) {
	this.vertices[Vertex.count] = vertex;
}

Graph.prototype.addEdge = function(edge) {
	this.edges[Edge.count] = edge;
}

Graph.prototype.removeVertex = function(id) {
	for (edge in this.edges) {
		if (this.edges[edge].vertex1 == this.vertices[id] || this.edges[edge].vertex2 == this.vertices[id]) {
			delete this.edges[edge];
		}
	}
	delete this.vertices[id];
}

Graph.prototype.removeEdge = function(id) {
	delete this.edges[id];
}

Graph.prototype.draw = function(canvas, context) {
	canvas.width = canvas.width;
	for (edge in this.edges) {
		this.edges[edge].draw(context);
	}
	for (vertex in this.vertices) {
		this.vertices[vertex].draw(context);
	}
}

Graph.prototype.isVertexClicked = function isVertexClicked(event) {
	var pos = getMousePos(event);
	var inVertex = false;
	var clickedVertex = 0;
	for (vertex in graph.vertices) {
		inVertex = pos.x <= graph.vertices[vertex].pos.x + 2*Vertex.imgWidth &&
				   pos.x >= graph.vertices[vertex].pos.x - Vertex.imgWidth &&
				   pos.y <= graph.vertices[vertex].pos.y + 2*Vertex.imgHeight &&
				   pos.y >= graph.vertices[vertex].pos.y - Vertex.imgHeight;
		if (inVertex) {
			clickedVertex = vertex;
			if (event.type == "mousedown") {
				mousedownVertex = graph.vertices[vertex];
			}
			if (event.type == "mouseup") {
				mouseupVertex = graph.vertices[vertex];
			}
			break;
		}
	}
	return clickedVertex;
}

Graph.prototype.isEdgeClicked = function isEdgeClicked(event) {
	var pos = getMousePos(event);
	var inEdge = false;
	var clickedEdge = 0;
	for (edge in graph.edges) {
		var m = (graph.edges[edge].vertex1.pos.y - graph.edges[edge].vertex2.pos.y) / (graph.edges[edge].vertex1.pos.x - graph.edges[edge].vertex2.pos.x);
		var yminusy = pos.y - graph.edges[edge].vertex1.pos.y;
		var xminusx = pos.x - graph.edges[edge].vertex1.pos.x 
		console.log(yminusy, xminusx, m, m*xminusx);
		inEdge = (Math.abs(yminusy - (xminusx*m)) < 2);
		if (inEdge) {
			clickedEdge = edge;
			break;
		}
	}
	return clickedEdge;
}