let config = require('_config');
let energy = require('_energy');

let roleBuilder = {
	run: function (creep) {
		energy.check(creep)
	    if (creep.memory.full) {
			let targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
            if (targets.length) {
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
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