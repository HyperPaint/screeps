let config = require('_config');

let roleSoldierMelee = {
	run: function (creep) {
		// ������
		if (creep.memory.full) {
			let targets = creep.room.find(FIND_HOSTILE_CREEPS);
			targets.sort();
			if (targets.length) {
				if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], { visualizePathStyle: config.pathStyle });
				}
			}
		}
	}
};

module.exports = roleSoldierMelee;