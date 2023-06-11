const otherConstants = require("./other.constants");
const otherVisual = require("./other.visual");
const roleCreepHarvester = require("./role.creep.harvester");

const roleCreepUpgrader = {
    /**
     * Функция для работы крипов.
     * Должна вызываться каждый тик.
     * @param {Creep} creep 
     */
    process: function(creep) {
        // Если текущая задача улучшать
        if (creep.memory.upgrading) {
            // И ресурсы закончились
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                // Не улучшать, добывать ресурсы
                creep.memory.upgrading = false;
            } else {
                this.upgradeController(creep);
            }
        }
        // Если текущая задача добывать
        else {
            // И ресурсы добыты
            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                // Улушать, не добывать ресурсы
                creep.memory.upgrading = true;
            } else {
                if (creep.memory.sourceId != undefined) {
                    roleCreepHarvester.harvest(creep, Game.getObjectById(creep.memory.sourceId));
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
    initialMemory: function(spawn) {
        // Память роли, если не создана
        if (spawn.room.memory.upgraders == undefined) {
            spawn.room.memory.upgraders = {};
        }
        // Счётчик роли, если не создан
        if (spawn.room.memory.upgraders.counter == undefined) {
            spawn.room.memory.upgraders.counter = 0;
        }
        return { role: otherConstants.roleNames.upgrader, sourceId: roleCreepHarvester.initialSource(spawn.room, spawn.room.memory.upgraders.counter++) };
    },

    /**
     * Улучшить контроллер в текущей комнате.
     * @param {Creep} creep Крип, который будет улучшать.
     */
    upgradeController: function(creep) {
        // Улучшить контроллер
        let result = creep.upgradeController(creep.room.controller);
        switch (result) {
            // The operation has been scheduled successfully
            case OK:
                otherVisual.setSuccess(creep.room.visual, creep.room.controller.pos);
                break;

            // You are not the owner of this creep or the target controller
            case ERR_NOT_OWNER:
                console.log("Крип " + creep.name + " или контроллер не принадлежат тебе");
                break;

            // The creep is still being spawned
            case ERR_BUSY:
                break;

            // The creep does not have any carried energy
            case ERR_NOT_ENOUGH_RESOURCES:
                creep.say("Пусто");
                otherVisual.setError(creep.room.visual, creep.pos);
                break;

            // The target is not a valid controller object, or the controller upgrading is blocked
            case ERR_INVALID_TARGET:
                creep.say("Не нашел");
                otherVisual.setError(creep.room.visual, creep.room.controller.pos);
                break;

            // The target is too far away
            case ERR_NOT_IN_RANGE:
                creep.moveTo(creep.room.controller);
                break;

            // There are no WORK body parts in this creep's body
            case ERR_NO_BODYPART:
                creep.say("Нет WORK");
                otherVisual.setError(creep.room.visual, creep.pos);
                break;

            default:
                console.log("Не удалось улучшить контроллер, код ошибки " + result);
                break;
        }
    }
};

module.exports = roleCreepUpgrader;