function Graph() {
	this.vertices = new Array();
	this.edges = new Array();
}

Graph.prototype.addVertex = function(vertex) {
	this.vertices[Vertex.count] = new Vertex(vertex);
}

Graph.prototype.addEdge = function() {
}

Graph.prototype.removeVertex = function() {
}

Graph.prototype.removeEdge = function() {
}