function Vertex(obj) {
	Vertex.count++;
	this.pos = {x: obj.x, y: obj.y };
	this.id = Vertex.count;
}

Vertex.count = 0;