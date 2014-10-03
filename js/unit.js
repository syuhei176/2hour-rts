function Unit(id) {
	this.unit_id = id;
	var x = Math.random() * 5 - 10;
    jThree("scene").append('<obj id="unit'+this.unit_id+'" style="rotateY: 0; position: '+x+' -30 0;"><mesh geo="#unit-geo" mtl="#unit-mtl" /></obj>')
	 console.log("#unit"+this.unit_id);
}

Unit.prototype.get_id = function() {
	return this.unit_id;
}

Unit.prototype.get_elem = function() {
	return jThree("#unit" + this.unit_id);
}

Unit.prototype.move = function(pos) {
    jThree("#unit" + this.unit_id).animate({positionX : pos.x, positionY : "+=0", positionZ : pos.z}, 1000);
}
