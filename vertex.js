function Vertex(obj) {
	Vertex.count++;
	this.pos = {x: obj.x, y: obj.y };
	this.id = Vertex.count;
}

Vertex.prototype.draw = function(context) {
	var x = this.pos.x - vertexWidth/2;
	var y = this.pos.y - vertexHeight/2;
	var drawing = new Image();
	drawing.src = "vertex.png";
	drawing.onload = function() {
		context.drawImage(drawing, x, y);
	}
}

Vertex.count = 0;