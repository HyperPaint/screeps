let roleHarvester = require('role.creep.harvester');
let roleUpgrader = require('role.creep.upgrader');

module.exports.loop = function () {

    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: ', name);
        }
    }

    let spawn = Game.spawns['Spawn1'];

    if (!spawn.spawning) {
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(harvesters.length < 1) {
            let name = 'Harvester-' + Game.time % 1500;
            if (spawn.spawnCreep([WORK,CARRY,MOVE,MOVE], name, { memory: {role: 'harvester' } } ) == OK) {
                console.log('Spawning ' + name);
            }
        }
    }

    if (!spawn.spawning) {
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if(upgraders.length < 1) {
            let name = 'Upgrader-' + Game.time % 1500;
            if (spawn.spawnCreep([WORK,CARRY,MOVE,MOVE], name, { memory: {role: 'upgrader', upgrading: 'false' } } ) == OK) {
                console.log('Spawning ' + name);
            }
        }
    }
    
    if (Game.spawns['Spawn1'].spawning) { 
        let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns['Spawn1'].pos.x, Game.spawns['Spawn1'].pos.y + 1);
    }

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            roleHarvester.process(creep);
        }

        if(creep.memory.role == 'upgrader') {
            roleUpgrader.process(creep);
        }
    }
}