const otherConstants = require("./other.constants");
const otherVisual = require("./other.visual");
const roleCreepHarvester = require("./role.creep.harvester");

const roleCreepBuilder = {
    /**
     * Функция для работы крипов.
     * Должна вызываться каждый тик.
     * @param {Creep} creep 
     */
    process: function(creep) {
        // Если текущая задача строить
        if (creep.memory.building) {
            // И ресурсы закончились
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                // Не строить, добывать ресурсы
                creep.memory.building = false;
            } else {
                this.buildAndRepair(creep);
            }
        }
        // Если текущая задача добывать
        else {
            // И ресурсы добыты
            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                // Строить, не добывать ресурсы
                creep.memory.building = true;
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
        if (spawn.room.memory.builders == undefined) {
            spawn.room.memory.builders = {};
        }
        // Счётчик роли, если не создан
        if (spawn.room.memory.builders.counter == undefined) {
            spawn.room.memory.builders.counter = 0;
        }
        return { role: otherConstants.roleNames.builder, sourceId: roleCreepHarvester.initialSource(spawn.room, spawn.room.memory.builders.counter++) };
    },

    buildExtensions: function(creep, constructionSites) {
        let structures = _.filter(constructionSites, (object) => object.structureType == STRUCTURE_EXTENSION);
        if (structures.length) {
            let target = creep.pos.findClosestByRange(structures);

            // Отнести
            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                otherVisual.setSuccess(creep.room.visual, target.pos);
            }
            return true;
        } else {
            return false;
        }
    },

    buildRoads: function(creep, constructionSites) {
        let structures = _.filter(constructionSites, (object) => object.structureType == STRUCTURE_ROAD);
        if (structures.length) {
            let target = creep.pos.findClosestByRange(structures);

            // Отнести
            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                otherVisual.setSuccess(creep.room.visual, target.pos);
            }
            return true;
        } else {
            return false;
        }
    },

    repairRoads: function(creep, buildings) {

    },

    buildWalls: function(creep, constructionSites) {
        let structures = _.filter(constructionSites, (object) => object.structureType == STRUCTURE_WALL);
        if (structures.length) {
            let target = creep.pos.findClosestByRange(structures);

            // Отнести
            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                otherVisual.setSuccess(creep.room.visual, target.pos);
            }
            return true;
        } else {
            return false;
        }
    },

    repairWalls: function(creep, buildings) {

    },

    buildRamparts: function(creep, constructionSites) {
        let structures = _.filter(constructionSites, (object) => object.structureType == STRUCTURE_RAMPART);
        if (structures.length) {
            let target = creep.pos.findClosestByRange(structures);
            // Отнести
            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                otherVisual.setSuccess(creep.room.visual, target.pos);
            }
            return true;
        } else {
            return false;
        }
    },

    buildTowers: function(creep, constructionSites) {
        let structures = _.filter(constructionSites, (object) => object.structureType == STRUCTURE_TOWER);
        if (structures.length) {
            let target = creep.pos.findClosestByRange(structures);
            // Отнести
            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                otherVisual.setSuccess(creep.room.visual, target.pos);
            }
            return true;
        } else {
            return false;
        }
    },

    buildContainers: function(creep, constructionSites) {
        let structures = _.filter(constructionSites, (object) => object.structureType == STRUCTURE_CONTAINER);
        if (structures.length) {
            let target = creep.pos.findClosestByRange(structures);
            // Отнести
            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                otherVisual.setSuccess(creep.room.visual, target.pos);
            }
            return true;
        } else {
            return false;
        }
    },

    /**
     * Строить здания в текущей комнате.
     * @param {Creep} creep Крип, который будет строить.
     */
    buildAndRepair: function(creep) {
        let structures = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (structures.length) {
            if (this.buildExtensions(creep, structures)) {
                return;
            }
            else if (this.buildContainers(creep, structures)) {
                return;
            }
            else if (this.buildRoads(creep, structures)) {
                return;
            }
            else if (this.buildWalls(creep, structures)) {
                return;
            }
        }
    }
};

module.exports = roleCreepBuilder;