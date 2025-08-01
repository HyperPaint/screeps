let roleBase = require("role.base");

let roleHarvester = {
    run: function(creep) {
        if (creep.spawning) {
            return 0;
        }

        if (roleBase.harvest(creep) == 0) {
            if(roleBase.transferResource(creep, RESOURCE_ENERGY, FIND_MY_SPAWNS) == 0) {
                creep.say("🟢");
            }
        }
	}
};

module.exports = roleHarvester;
