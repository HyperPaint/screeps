let config = require('_config');

let energy = {
	// регистрация источника энергии крипу
	register: function(creep) {
		if (!creep.room.memory.sources) {
			require('_room').map(creep.room);
		}
		let sources = creep.room.memory.sources;
		creep.memory.source_id = sources[sources.sources_counter % sources.sources_length].id;
		sources.sources_counter += 1;
		creep.room.memory.sources = sources;
		return 0;
	},

	// складывание на спавн
	storeToSpawn: function (creep) {
		let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_SPAWN
					|| structure.structureType == STRUCTURE_EXTENSION)
					&& structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
			}
		});
		if (target) {
			if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target, { visualizePathStyle: config.pathStyle });
			}
			return true;
		}
		else {
			return false;
		}
	},

	// складывание в контейнер
	storeToContainer: function(creep) {
		let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (structure) => {
					return structure.structureType == STRUCTURE_CONTAINER
						&& structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
		});
		if(target) {
			if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target, {visualizePathStyle: config.pathStyle});
			}
			return true;
		}
		else {
			return false;
		}
	},

	// складывание в контейнер
	storeToTower: function (creep) {
		let target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
			filter: (structure) => structure.structureType == STRUCTURE_TOWER
		});
		if (target) {
			if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target, { visualizePathStyle: config.pathStyle });
			}
			return true;
		}
		else {
			return false;
		}
	},

	// проверка заполненности
	check: function (creep) {
		if (creep.memory.full && creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
			creep.memory.full = false;
			creep.say('Добывать!');
		}
		else if (!creep.memory.full && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
			creep.memory.full = true;
			creep.say('Загружен!');
		}
	},

	// добыча энергии копанием
	dig: function (creep) {
		// получение источника и проверка наличия источника
		let source = Game.getObjectById(creep.memory.source_id);
		if (!source) {
			this.register(creep);
			source = Game.getObjectById(creep.memory.source_id);
		}
		// работа
		if (!creep.memory.full) {
			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source, { visualizePathStyle: config.pathStyle });
			}
			return true;
		}
		else {
			return false;
		}
	},

	// добыча энергии копанием
	harvest: function(creep) {
		this.check(creep);
		return this.dig(creep);
	},
	
};
	
module.exports = energy;