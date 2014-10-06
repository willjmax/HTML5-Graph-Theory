function Vertex(obj) {
	Vertex.count++;
	this.pos = {x: obj.x, y: obj.y };
	this.id = Vertex.count;
}

Vertex.prototype.draw = function(context) {
	var x = this.pos.x - Vertex.imgWidth/2;
	var y = this.pos.y - Vertex.imgHeight/2;
	if (Vertex.imageLoaded) {
		context.drawImage(Vertex.image, x, y);
	}
}

Vertex.count = 0;
Vertex.imgWidth = 12;
Vertex.imgHeight = 12;
Vertex.imageLoaded = false;
Vertex.image = new Image();
Vertex.image.src = "vertex.png";
Vertex.image.onload = function() {
	Vertex.imageLoaded = true;
}