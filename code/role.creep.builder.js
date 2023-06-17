const libCreep = require("./lib.creep");
const libCreepHighLevel = require("./lib.creep.highlevel");
const libVisual = require("./lib.visual");
const staticConstants = require("./static.constants");

const roleCreepBuilder = {
    /**
     * Функция для работы крипов.
     * Должна вызываться каждый тик.
     * @param {Creep} creep 
     */
    process: function(creep) {
        if (creep.memory.building) {
            // Строить
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                // И ресурсы закончились
                creep.memory.building = false;
            } else {
                // И ресурсы не закончились
                if(!this.buildAndRepair(creep)) {
                    if(!libCreep.upgradeController(creep)) {
                        libVisual.setError(creep.room.visual, creep.pos);
                    }
                }
            }
        }
        else {
            // Добывать
            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                // И ресурсы добыты
                creep.memory.building = true;
            } else {
                // И ресурсы не добыты
                if (!libCreepHighLevel.spend(creep)) {
                    // Не удалось взять со склада
                    const targetId = creep.memory.sourceId;
                    libCreep.harvest(creep, targetId);
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
        if (spawn.room.memory.builders == undefined) {
            spawn.room.memory.builders = {};
        }
        // Счётчик роли, если не создан
        if (spawn.room.memory.builders.counter == undefined) {
            spawn.room.memory.builders.counter = 0;
        }
        const sourceId = libCreep.getRandomSource(spawn.room, spawn.room.memory.builders.counter++);
        const memory = {
            role: staticConstants.roleNames.builder,
            sourceId: sourceId,
        };
        return memory;
    },

    buildAndRepair: function(creep) {
        if (libCreepHighLevel.repair(creep, FIND_MY_SPAWNS, STRUCTURE_SPAWN)) return true;
        if (libCreepHighLevel.repair(creep, FIND_MY_STRUCTURES, STRUCTURE_EXTENSION)) return true;
        if (libCreepHighLevel.repair(creep, FIND_MY_STRUCTURES, STRUCTURE_TOWER)) return true;
        if (libCreepHighLevel.repair(creep, FIND_STRUCTURES, STRUCTURE_CONTAINER)) return true;
        if (libCreepHighLevel.repair(creep, FIND_MY_STRUCTURES, STRUCTURE_STORAGE)) return true;

        if (libCreepHighLevel.repair(creep, FIND_MY_STRUCTURES, STRUCTURE_RAMPART)) return true;
        if (libCreepHighLevel.repair(creep, FIND_STRUCTURES, STRUCTURE_WALL, 0.000016667)) return true;
        if (libCreepHighLevel.repair(creep, FIND_STRUCTURES, STRUCTURE_ROAD)) return true;

        if (libCreepHighLevel.build(creep, FIND_MY_CONSTRUCTION_SITES, STRUCTURE_SPAWN)) return true;
        if (libCreepHighLevel.build(creep, FIND_MY_CONSTRUCTION_SITES, STRUCTURE_EXTENSION)) return true;
        if (libCreepHighLevel.build(creep, FIND_MY_CONSTRUCTION_SITES, STRUCTURE_TOWER)) return true;
        if (libCreepHighLevel.build(creep, FIND_MY_CONSTRUCTION_SITES, STRUCTURE_CONTAINER)) return true;
        if (libCreepHighLevel.build(creep, FIND_MY_CONSTRUCTION_SITES, STRUCTURE_STORAGE)) return true;

        if (libCreepHighLevel.build(creep, FIND_MY_CONSTRUCTION_SITES, STRUCTURE_RAMPART)) return true;
        if (libCreepHighLevel.build(creep, FIND_MY_CONSTRUCTION_SITES, STRUCTURE_WALL)) return true;
        if (libCreepHighLevel.build(creep, FIND_MY_CONSTRUCTION_SITES, STRUCTURE_ROAD)) return true;

        return false;
    },
};

module.exports = roleCreepBuilder;