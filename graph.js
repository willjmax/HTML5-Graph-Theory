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
		console.log(edge);
		if (this.edges[edge].vertex1 == this.vertices[id] || this.edges[edge].vertex2 == this.vertices[id]) {
			delete this.edges[edge];
		}
	}
	delete this.vertices[id];
}

Graph.prototype.removeEdge = function() {
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