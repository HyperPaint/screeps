const libCreep = require("./lib.creep");
const libCreepHighLevel = require("./lib.creep.highlevel");
const staticConstants = require("./static.constants");

const roleCreepUpgrader = {
    /**
     * Функция для работы крипов.
     * Должна вызываться каждый тик.
     * @param {Creep} creep 
     */
    process: function(creep) {
        if (creep.memory.upgrading) {
            // Улучшать
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                // И ресурсы закончились
                creep.memory.upgrading = false;
            } else {
                // И ресурсы не закончились
                libCreep.upgradeController(creep);
            }
        }
        else {
            // Добывать
            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                // И ресурсы добыты
                creep.memory.upgrading = true;
            } else {
                // И ресурсы не добыты
                if (!this.spend(creep)) {
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
        if (spawn.room.memory.upgraders == undefined) {
            spawn.room.memory.upgraders = {};
        }
        // Счётчик роли, если не создан
        if (spawn.room.memory.upgraders.counter == undefined) {
            spawn.room.memory.upgraders.counter = 0;
        }
        const sourceId = libCreep.getRandomSource(spawn.room, spawn.room.memory.upgraders.counter++);
        const memory = {
            role: staticConstants.roleNames.upgrader,
            sourceId: sourceId,
        }
        return memory;
    },

    spend: function(creep) {
        if (libCreepHighLevel.spend(creep, FIND_MY_STRUCTURES, STRUCTURE_CONTAINER)) return true;
        if (libCreepHighLevel.spend(creep, FIND_MY_STRUCTURES, STRUCTURE_STORAGE)) return true;
        return false;
    },
};

module.exports = roleCreepUpgrader;