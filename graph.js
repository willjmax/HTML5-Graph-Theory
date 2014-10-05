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