function Edge(obj) {
	Edge.count++;
	this.vertex1 = obj.vertex1;
	this.vertex2 = obj.vertex2;
	this.id = Edge.count;
	this.weight = 0;
	this.translateX = 0;
	this.translateY = 0;
	this.rotation = 0;
	this.rectX = 0;
	this.rectY = 0;
	this.rectWidth = 0;
	this.rectHeight = 0;
	this.defineRect();
	this.unrotate();

}

Edge.prototype.olddraw = function(context) {
	var moveToX = this.vertex1.pos.x;
	var moveToY = this.vertex1.pos.y;
	var lineToX = this.vertex2.pos.x;
	var lineToY = this.vertex2.pos.y;
	context.beginPath();
	context.moveTo(moveToX, moveToY);
	context.lineTo(lineToX, lineToY);
	context.stroke();
}

Edge.prototype.draw = function(context) {
    this.defineRect();
	this.unrotate();
    context.save();
    context.beginPath();
    context.translate(this.translateX, this.translateY);
    context.rotate(this.rotation);
    context.rect(this.rectX, this.rectY, this.rectWidth, this.rectHeight);
    context.translate(-this.translateX, -this.translateY);
    context.rotate(-this.rotation);
    context.fillStyle = Edge.lineFill;
    context.strokeStyle = Edge.lineFill;
    context.fill();
    context.stroke();
    context.restore();
}

Edge.prototype.defineRect = function() {
	var dx = this.vertex2.pos.x - this.vertex1.pos.x;
	var dy = this.vertex2.pos.y - this.vertex1.pos.y;
	var lineLength = Math.sqrt((dx*dx) + (dy*dy));
	var lineRadianAngle = Math.atan2(dy, dx);
	
	this.translateX = this.vertex1.pos.x;
	this.translateY = this.vertex1.pos.y;
	this.rotation = lineRadianAngle;
	this.rectX = 0;
	this.rectY = -Edge.lineWidth / 2;
	this.rectWidth = lineLength;
	this.rectHeight = Edge.lineWidth;
}

Edge.prototype.unrotate = function() {
	this.unrotatedX1 = (this.vertex1.pos.x * Math.cos(-this.rotation)) - (this.vertex1.pos.y * Math.sin(-this.rotation));
	this.unrotatedY1 = (this.vertex1.pos.y * Math.cos(-this.rotation)) + (this.vertex1.pos.x * Math.sin(-this.rotation));
	this.unrotatedX2 = (this.vertex2.pos.x * Math.cos(-this.rotation)) - (this.vertex2.pos.y * Math.sin(-this.rotation));
	this.unrotatedY2 = this.unrotatedY1 + this.lineWidth;
}

Edge.count = 0;
Edge.lineWidth = 1;
Edge.lineFill = "black";