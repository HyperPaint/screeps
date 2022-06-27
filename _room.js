let config = require('_config');

let room = {

	// создание карты комнаты
	map: function(room) {
		if (!Memory.rooms) {
			Memory.rooms = {}
		}
		
		let sources = room.find(FIND_SOURCES)
		room.memory = {}
		room.memory.sources = {
			sources_length: sources.length,
			sources_counter: 0,
		}
		for (let i = 0;  i < sources.length; i++) {
			room.memory.sources[i] = {
				id: sources[i].id,
			}
		}
		return 0;
	},

	// работа спавна
	spawn: function() {
		// чистка памяти
		for(let name in Memory.creeps) {
			if(!Game.creeps[name]) {
				console.log('Чистка памяти:', name);
				delete Memory.creeps[name];
			}
		}
		
		let creeps;
		let room;
		for (let roomName in Game.rooms) {
			room = Game.rooms[roomName];
		    // harvester
    		creeps = _.filter(Game.creeps, (creep) => creep.memory.role == config.roles.harvester);
    		if (creeps.length < config.get(room).harvester_count) {
    			let name = config.roles.harvester + Game.time % 1500;
    			if (Game.spawns['Main-Spawn'].spawnCreep([WORK, CARRY, MOVE, MOVE], name, { memory: { role: config.roles.harvester}}) == 0) {
    			    console.log("Создание " + config.roles.harvester + ": " + name);
    			}
    			return 0;
    		}
    		// upgrader
    		creeps = _.filter(Game.creeps, (creep) => creep.memory.role == config.roles.upgrader);
    		if (creeps.length < config.get(room).upgrader_count) {
    			let name = config.roles.upgrader + Game.time % 1500;
    			if (Game.spawns['Main-Spawn'].spawnCreep([WORK, CARRY, MOVE, MOVE], name, { memory: { role: config.roles.upgrader }}) == 0) {
    			    console.log("Создание " + config.roles.upgrader + ": " + name);
    			}
    			return 0;
    		}
    		// builder
    		creeps = _.filter(Game.creeps, (creep) => creep.memory.role == config.roles.builder);
    		if (creeps.length < config.get(room).builder_count) {
    			let name = config.roles.builder + Game.time % 1500;
    			if (Game.spawns['Main-Spawn'].spawnCreep([WORK, CARRY, MOVE, MOVE], name, { memory: { role: config.roles.builder }}) == 0) {
    			    console.log("Создание " + config.roles.builder + ": " + name);
    			}
    			return 0;
    		}
		}
		return -1;
	},
};

module.exports = room;