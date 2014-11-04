function Graph() {
	this.vertices = { };
	this.edges = { };
	this.weighted = false;
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
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (edge in this.edges) {
		this.edges[edge].draw(context, canvas, this.weighted);
	}
	for (vertex in this.vertices) {
		this.vertices[vertex].draw(context);
	}
}

Graph.prototype.isVertexClicked = function (event) {
	var pos = getMousePos(event);
	var inVertex = false;
	var clickedVertex = 0;
	for (vertex in this.vertices) {
		inVertex = pos.x <= this.vertices[vertex].pos.x + 2*Vertex.imgWidth &&
				   pos.x >= this.vertices[vertex].pos.x - Vertex.imgWidth &&
				   pos.y <= this.vertices[vertex].pos.y + 2*Vertex.imgHeight &&
				   pos.y >= this.vertices[vertex].pos.y - Vertex.imgHeight;
		if (inVertex) {
			clickedVertex = vertex;
			if (event.type == "mousedown") {
				mousedownVertex = this.vertices[vertex];
			}
			if (event.type == "mouseup") {
				mouseupVertex = this.vertices[vertex];
			}
			break;
		}
	}
	return clickedVertex;
}

Graph.prototype.isEdgeClicked = function (event) {
	var pos = getMousePos(event);
	var inEdge = false;
	var clickedEdge = 0;
	for (edge in this.edges) {
		if (!this.edges[edge].reflexive) {
			var x = (pos.x * Math.cos(-this.edges[edge].rotation)) - (pos.y * Math.sin(-this.edges[edge].rotation));
			var y = (pos.y * Math.cos(-this.edges[edge].rotation)) + (pos.x * Math.sin(-this.edges[edge].rotation));
			var validX = (x >= Math.min(this.edges[edge].unrotatedX1, this.edges[edge].unrotatedX2) && x <= Math.max(this.edges[edge].unrotatedX1, this.edges[edge].unrotatedX2));
			var validY = (y >= (this.edges[edge].unrotatedY1 - 3) && y <= (this.edges[edge].unrotatedY1 + 3));
			inEdge = (validX && validY);
		} else {
			var distance = Math.sqrt(Math.pow(this.edges[edge].reflexiveCenter.x - pos.x, 2) +
									 Math.pow(this.edges[edge].reflexiveCenter.y - pos.y, 2));
			inEdge = (distance >= Edge.radius - 3 && distance <= Edge.radius + 3);
		}
		if (inEdge) {
			clickedEdge = edge;
			break;
		}
	}
	return clickedEdge;
}

Graph.prototype.checkWeights = function() {
	this.weighted = false;
	for (edge in graph.edges) {
		if (this.edges[edge].weight > 0) {
			this.weighted = true;
			break;
		}
	}
}