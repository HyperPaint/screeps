const libCreep = require("./lib.creep");
const libCreepHighLevel = require("./lib.creep.highlevel");
const libVisual = require("./lib.visual");
const staticConstants = require("./static.constants");

const roleCreepHarvester = {
    /**
     * Функция для работы крипов.
     * Должна вызываться каждый тик.
     * @param {Creep} creep 
     */
    process: function(creep) {
        if (creep.memory.harvesting) {
            // Добывать
            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                // И ресурсы добыты
                creep.memory.harvesting = false;
            } else {
                // И ресурсы не добыты
                const targetId = creep.memory.sourceId;
                libCreep.harvest(creep, targetId);
            }
        } else {
            // Разгружать
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                // И ресурсы закончились
                creep.memory.harvesting = true;
            } else {
                // И ресурсы не закончились
                if(!this.store(creep)) {
                    if(!libCreep.upgradeController(creep)) {
                        libVisual.setError(creep.room.visual, creep.pos);
                    }
                }
            }
        }
    },

    /**
     * Функция для получения объекта изначальной памяти крипа.
     * Крип работает в комнате.
     * @param {StructureSpawn} spawn Спавн, в котором создаётся крип.
     * @returns {Memory} Возвращает объект памяти.
     */
    getInitialMemory: function(spawn) {
        // Память роли, если не создана
        if (spawn.room.memory.harvesters == undefined) {
            spawn.room.memory.harvesters = {};
        }
        // Счётчик роли, если не создан
        if (spawn.room.memory.harvesters.counter == undefined) {
            spawn.room.memory.harvesters.counter = 0;
        }
        const sourceId = libCreep.getRandomSource(spawn.room, spawn.room.memory.harvesters.counter++);
        const memory = {
            role: staticConstants.roleNames.harvester,
            sourceId: sourceId,
        };
        return memory;
    },

    store: function(creep) {
        if (libCreepHighLevel.store(creep, FIND_MY_SPAWNS, STRUCTURE_SPAWN)) return true;
        if (libCreepHighLevel.store(creep, FIND_MY_STRUCTURES, STRUCTURE_EXTENSION)) return true;
        if (libCreepHighLevel.store(creep, FIND_MY_STRUCTURES, STRUCTURE_TOWER)) return true;
        if (libCreepHighLevel.store(creep, FIND_STRUCTURES, STRUCTURE_CONTAINER)) return true;
        if (libCreepHighLevel.store(creep, FIND_MY_STRUCTURES, STRUCTURE_STORAGE)) return true;

        return false;
    },
};

module.exports = roleCreepHarvester;