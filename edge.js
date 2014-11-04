function Edge(obj) {
	Edge.count++;
	this.vertex1 = obj.vertex1;
	this.vertex2 = obj.vertex2;
	this.id = Edge.count;
	this.weight = 0;
	
	this.reflexive = (obj.vertex1.equals(obj.vertex2));
	this.reflexiveCenter = {x: 0, y: 0};
	
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

Edge.prototype.draw = function(context, canvas, weighted) {
	if (!this.reflexive) {
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
		if (weighted) {
			var centerX = (this.vertex1.pos.x + this.vertex2.pos.x) / 2;
			var centerY = (this.vertex1.pos.y + this.vertex2.pos.y) / 2;
			context.font = Edge.font;
			context.lineWidth = Edge.lineWidth;
			context.fillText(this.weight, centerX, centerY);
		}
	} else {
		if (this.vertex1.pos.x > 2*canvas.width/3 && this.vertex1.pos.y < canvas.height/2) {
			this.reflexiveCenter.x = this.vertex1.pos.x + (Edge.radius/2 + Edge.radiusOffset);
			this.reflexiveCenter.y = this.vertex1.pos.y - (Edge.radius/2 + Edge.radiusOffset);
		} else if (this.vertex1.pos.x < canvas.width/3 && this.vertex1.pos.y < canvas.height/2) {
			this.reflexiveCenter.x = this.vertex1.pos.x - (Edge.radius/2 + Edge.radiusOffset);
			this.reflexiveCenter.y = this.vertex1.pos.y - (Edge.radius/2 + Edge.radiusOffset);
		} else if (this.vertex1.pos.x < canvas.width/3 && this.vertex1.pos.y > canvas.height/2) {
			this.reflexiveCenter.x = this.vertex1.pos.x - (Edge.radius/2 + Edge.radiusOffset);
			this.reflexiveCenter.y = this.vertex1.pos.y + (Edge.radius/2 + Edge.radiusOffset);
		} else if (this.vertex1.pos.x > 2*canvas.width/3 && this.vertex1.pos.y > canvas.height/2) {
			this.reflexiveCenter.x = this.vertex1.pos.x + (Edge.radius/2 + Edge.radiusOffset);
			this.reflexiveCenter.y = this.vertex1.pos.y + (Edge.radius/2 + Edge.radiusOffset);
		} else if (this.vertex1.pos.x > canvas.width/3 && this.vertex1.pos.x < 2*canvas.width/3 && this.vertex1.pos.y < canvas.height/2) {
			this.reflexiveCenter.x = this.vertex1.pos.x;
			this.reflexiveCenter.y = this.vertex1.pos.y - (Edge.radius/2 + Edge.radiusOffset + 8);
		} else if (this.vertex1.pos.x < canvas.width/3 && this.vertex1.pos.y > 2*canvas.height/3 && this.vertex1.pos.y < canvas.height/3) {
			this.reflexiveCenter.x = this.vertex1.pos.x - (Edge.radius/2 + Edge.radiusOffset);
			this.reflexiveCenter.y = this.vertex1.pos.y;
		} else if (this.vertex1.pos.x > 2*canvas.width/2 && this.vertex1.pos.y > canvas.height/3 && this.vertex1.pos.y < 2*canvas.height/3) {
			this.reflexiveCenter.x = this.vertex.pos.x + (Edge.radius/2 + Edge.radiusOffset);
			this.reflexiveCenter.y = this.vertex.pos.y;
		} else if (this.vertex1.pos.x > canvas.width/3 && this.vertex1.pos.x < 2*canvas.width/3 && this.vertex1.pos.y > canvas.height/2) {
			this.reflexiveCenter.x = this.vertex1.pos.x;
			this.reflexiveCenter.y = this.vertex1.pos.y + (Edge.radius/2 + Edge.radiusOffset + 8);
		}
		
		context.beginPath();
		context.arc(this.reflexiveCenter.x, this.reflexiveCenter.y, Edge.radius, 0, 2*Math.PI);
		context.lineWidth = Edge.lineWidth*2;
		context.fillStyle = Edge.lineFill;
		context.strokeStyle = Edge.lineFill;
		context.stroke();
	}
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
	this.unrotatedY2 = this.unrotatedY1 + Edge.lineWidth;
}

Edge.count = 0;
Edge.lineWidth = 1;
Edge.lineFill = "black";
Edge.font = "25px Arial";
Edge.radius = 25;
Edge.radiusOffset = 2;