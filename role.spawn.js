let roleSpawn = {
    run: function(room) {
        if (Object.keys(room.memory).length == 0) {
            let sources = room.find(FIND_SOURCES).length;

            room.memory = {
                level: 1,
                harvesters: sources * 1,
                upgraders: sources * 2
            }
        }

        for (let name in Memory.creeps) {
            if (Game.creeps[name] == null) {
                delete Memory.creeps[name];
                console.log("Deleting creep with name " + name);
            }
        }

        let creeps = room.find(FIND_MY_CREEPS);
        let spawns = room.find(FIND_MY_SPAWNS,
            {
                filter: function(spawn) {
                    return spawn.spawning == null;
                }
            }
        );

        if (spawns.length == 0) {
            return;
        }

        let harvesters = _.filter(creeps, (creep) => creep.memory.role == "harvester").length;
        let MEMORY_HARVESTER = { memory: { role: "harvester" } };
        let LEVEL1_HARVESTER = [WORK, CARRY, CARRY, MOVE, MOVE] // 300
        if (harvesters < room.memory.harvesters) {
            let creepName = 'HARV' + Game.time % 1000;
            let result = spawns[0].spawnCreep(LEVEL1_HARVESTER, creepName, MEMORY_HARVESTER);
            if (result == OK) {
                console.log("Spawning creep with name " + creepName + " and parts [" + LEVEL1_HARVESTER + "]");
            }
            return;
        }

        let upgraders = _.filter(creeps, (creep) => creep.memory.role == "upgrader").length;
        let MEMORY_UPGRADER = { memory: { role: "upgrader" } };
        let LEVEL1_UPGRADER = [WORK, CARRY, CARRY, MOVE, MOVE] // 300
        if (upgraders < room.memory.upgraders) {
            let creepName = 'UPGR' + Game.time % 1000;
            let result = spawns[0].spawnCreep(LEVEL1_UPGRADER, creepName, MEMORY_UPGRADER);
            if (result == OK) {
                console.log("Spawning creep with name " + creepName + " and parts [" + LEVEL1_UPGRADER + "]");
            }
            return;
        }
    }
};

module.exports = roleSpawn;
