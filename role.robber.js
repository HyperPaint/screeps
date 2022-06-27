let config = require('_config');
let energy = require('_energy');

let roleHarvester = {

    run: function (creep) {
        if (!energy.harvest(creep))
            if (!energy.storeToSpawn(creep))
                energy.storeToContainer(creep);
	}
};

module.exports = roleHarvester;