let config = require('_config');
let energy = require('_energy');

let roleHarvester = {

    run: function(creep) {
        if (!energy.harvest(creep))
            if (!energy.storeToSpawn(creep))
                if (!energy.storeToContainer(creep))
                    energy.storeToTower(creep);
	}
};

module.exports = roleHarvester;