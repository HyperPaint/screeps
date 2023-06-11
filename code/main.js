const otherConstants = require("./other.constants");
const roleCreepBuilder = require("./role.creep.builder");
const roleCreepHarvester = require("./role.creep.harvester");
const roleCreepUpgrader = require("./role.creep.upgrader");
const roleStructureSpawn = require("./role.structure.spawn");

function main() {
    // Деятельность крипов
    for (let creepName in Game.creeps) {
        let creep = Game.creeps[creepName];
        if (creep.memory.role == otherConstants.roleNames.harvester) { // Добытчик
            roleCreepHarvester.process(creep);
        } else if (creep.memory.role == otherConstants.roleNames.upgrader) { // Улучшатель
            roleCreepUpgrader.process(creep);
        } else if (creep.memory.role == otherConstants.roleNames.builder) { // Строитель
            roleCreepBuilder.process(creep);
        }
    }

    // Деятельность спавнов
    for (let spawnName in Game.spawns) {
        let spawn = Game.spawns[spawnName];
        roleStructureSpawn.process(spawn);
    }
}

module.exports.loop = main;