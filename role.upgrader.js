let roleBase = require("role.base");

let roleUpgrader = {
    run: function(creep) {
        if (creep.spawning) {
            return 0;
        }

        if (roleBase.harvest(creep) == 0) {
            roleBase.upgradeController(creep);
        }
	}
};

module.exports = roleUpgrader;
