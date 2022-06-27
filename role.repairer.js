let config = require('_config');
let energy = require('_energy');

let roleBuilder = {
	run: function(creep) {
		energy.check(creep)
		if (creep.memory.full) {
			let targets = creep.room.find(FIND_MY_STRUCTURES, {
				filter: object => {
					switch (object.structureType) {
						case STRUCTURE_WALL:
							return object.hits < 1000
						default:
							return object.hits < object.hitsMax
					}
				}
			});
			if (targets.length) {
				if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], { visualizePathStyle: config.pathStyle });
				}
			}
		}
		else {
			energy.dig(creep);
		}
	}
};

module.exports = roleBuilder;