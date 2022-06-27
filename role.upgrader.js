let config = require('_config');
let energy = require('_energy');

let roleUpgrader = {

    run: function (creep) {
        energy.check(creep)
	    if(creep.memory.full) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: config.pathStyle});
            }
        }
        else {
            energy.dig(creep);
        }
	}
};

module.exports = roleUpgrader;