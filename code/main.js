const roleCreepBuilder = require("./role.creep.builder");
const roleCreepHarvester = require("./role.creep.harvester");
const roleCreepUpgrader = require("./role.creep.upgrader");
const roleStructureSpawn = require("./role.structure.spawn");
const staticConstants = require("./static.constants");

function main() {
    // Деятельность крипов
    for (let creepName in Game.creeps) {
        let creep = Game.creeps[creepName];
        if (creep.memory.role == staticConstants.roleNames.harvester) {
            // Добытчик
            try {
                roleCreepHarvester.process(creep);
            } catch (error) {
                console.log(error);
            }
        } else if (creep.memory.role == staticConstants.roleNames.upgrader) {
            // Улучшатель
            try {
                roleCreepUpgrader.process(creep);
            } catch (error) {
                console.log(error);
            }
        } else if (creep.memory.role == staticConstants.roleNames.builder) {
            // Строитель
            try {
                roleCreepBuilder.process(creep);
            } catch (error) {
                console.log(error);
            }
            
        }
    }

    // Деятельность спавнов
    for (let spawnName in Game.spawns) {
        let spawn = Game.spawns[spawnName];
        try {
            roleStructureSpawn.process(spawn);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports.loop = main;