function PlayerManager(dataStore) {
	var self = this;
	this.dataStore = dataStore;
	this.players = {};
	this.units = {};
	this.listeners = {
		"create-unit" : []
	}
	this.dataStore.on("send", function(e) {
    	if(e.value.cmd == "player-create") {
    		var np = new Player(e.value.pid);
    		self.players[e.value.pid] = np;
    	}else if(e.value.cmd == "unit-create") {
    		var nu = new Unit(e.value.uid);
    		self.units[e.value.uid] = nu;
    		self.emit("create-unit", {
    			unit_id : e.value.uid
    		});
    	}else if(e.value.cmd == "unit-move") {
    		if(!self.units[e.value.uid]) {
	    		var nu = new Unit(e.value.uid);
	    		self.units[e.value.uid] = nu;
	    		self.emit("create-unit", {
	    			unit_id : e.value.uid
	    		});
			}
    		self.units[e.value.uid].move(e.value.pos)
    	}
	});
}

PlayerManager.prototype.get_unit = function(id) {
	this.units[id];
}


PlayerManager.prototype.on = function(event, l) {
	this.listeners[event].push(l);
}

PlayerManager.prototype.emit = function(event, args) {
	this.listeners[event].forEach(function(l) {
		l(args);
	});
}

PlayerManager.prototype.create_player = function() {
	var player_id = new Date().getTime().toString(36);
	this.dataStore.send({
		cmd : "player-create",
		pid : player_id
	});
	return player_id;
}

PlayerManager.prototype.create_unit = function() {
	var unit_id = new Date().getTime().toString(36);
	this.dataStore.send({
		cmd : "unit-create",
		uid : unit_id
	});
	return unit_id;
}

PlayerManager.prototype.move_unit = function(id, pos) {
	this.dataStore.send({
		cmd : "unit-move",
		uid : id,
		pos : pos
	});
}