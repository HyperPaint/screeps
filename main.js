let roleSpawn = require("role.spawn");
let roleHarvester = require("role.harvester");
let roleUpgrader = require("role.upgrader");

module.exports.loop = function () {
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        if (creep.memory.role == "harvester") {
            try {
                roleHarvester.run(creep);
            } catch (error) {
                console.log("Can't run role harvester, error=" + error);
            }
        } else if (creep.memory.role == "upgrader") {
            try {
                roleUpgrader.run(creep);
            } catch (error) {
                console.log("Can't run role upgrader, error=" + error);
            }
        }
    }

    if (Game.time % 10 == 0) {
        for (let name in Game.rooms) {
            let room = Game.rooms[name];

            try {
                roleSpawn.run(room)
            } catch (error) {
                console.log("Can't run role spawn, error=" + error);
            }
        }
    }
}
