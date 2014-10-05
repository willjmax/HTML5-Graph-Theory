function Edge(obj) {
	Edge.count++;
	this.vertex1 = obj.vertex1;
	this.vertex2 = obj.vertex2;
	this.id = Edge.count;
	console.log(obj)
}

Edge.count = 0;