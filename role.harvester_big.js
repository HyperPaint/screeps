let config = require('_config');
let energy = require('_energy');

let roleHarvesterBig = {

    run: function (creep) {
        if (!energy.harvest(creep))
            energy.storeToContainer(creep);
	}
};

module.exports = roleHarvesterBig;