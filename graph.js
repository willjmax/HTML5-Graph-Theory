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

Graph.prototype.removeVertex = function() {
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