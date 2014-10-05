function Edge(obj) {
	Edge.count++;
	this.vertex1 = obj.vertex1;
	this.vertex2 = obj.vertex2;
	this.id = Edge.count;
}

Edge.prototype.draw = function(context) {
	var moveToX = this.vertex1.pos.x;
	var moveToY = this.vertex1.pos.y;
	var lineToX = this.vertex2.pos.x;
	var lineToY = this.vertex2.pos.y;
	context.beginPath();
	context.moveTo(moveToX, moveToY);
	context.lineTo(lineToX, lineToY);
	context.stroke();
}

Edge.count = 0;