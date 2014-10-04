function Edge(obj) {
	Edge.count++;
	this.vertices = [obj.vertex1, obj.vertex2];
	this.id = count;
}

Edge.count = 0;