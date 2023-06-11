const otherConstants = require("./other.constants");
const otherConstantsErrors = require("./other.constants.errors");
const otherConstantsStrings = require("./other.constants.strings");
const otherVisual = require("./other.visual");
const roleStaticEpoch = require("./role.static.epoch");

module.exports = {
    /**
     * Функция для работы крипов.
     * Должна вызываться каждый тик.
     * @param {Creep} creep 
     */
    process: function(creep) {
        // Если есть свободное место
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY)) {
            this.harvest(creep, Game.getObjectById(creep.memory.sourceId));
            // Если свободного места нет
        } else {
            this.store(creep);
        }
    },

    /**
     * Функция вернёт один из ID источников энергии, которые крип в будущем будет пытаться добывать.
     * @param {Room} room Комната, в которой требуется выбрать источник
     * @param {Number} counter Счётчик, используемый для балансировки. Может быть любым числом, например 0.
     * @returns {ID} Идентификатор источника энергии.
     */
    initialSource: function(room, counter) {
        // Память источников, если не создана
        if (room.memory.sources == undefined) {
            room.memory.sources = {};
        }
        // Память количества источников, если не создана
        if (room.memory.sources.count == undefined) {
            let sources = room.find(FIND_SOURCES);
            room.memory.sources.count = sources.length;
        }
        // Память идентификаторов источников, если не создана
        try {
            for (let index = 0; index < room.memory.sources.count; index++) {
                if (room.memory.sources[index.toString()] == undefined) {
                    throw 1;
                }
            }
        } catch (error) {
            let sources = room.find(FIND_SOURCES);
            for (let index = 0; index < sources.length; index++) {
                room.memory.sources[index.toString()] = sources[index].id;
            }
        }
        // Подготовка источника
        let sourceId = room.memory.sources[counter % room.memory.sources.count];
        return sourceId;
    },

    /**
     * Функция для получения объекта изначальной памяти крипа.
     * Крип работает в комнате.
     * @param {StructureSpawn} spawn Спавн, в котором создаётся крип.
     * @returns {Memory} Возвращает объект памяти.
     */
    initialMemory: function(spawn) {
        // Память роли, если не создана
        if (spawn.room.memory.harvesters == undefined) {
            spawn.room.memory.harvesters = {};
        }
        // Счётчик роли, если не создан
        if (spawn.room.memory.harvesters.counter == undefined) {
            spawn.room.memory.harvesters.counter = 0;
        }
        return { role: otherConstants.roleNames.harvester, sourceId: this.initialSource(spawn.room, spawn.room.memory.harvesters.counter++) };
    },

    /**
     * Функция для добычи конкретного источника энергии
     * @param {Creep} creep Крип, который будет добывать
     * @param {Source} source Источник энергии
     */
    harvest: function(creep, source) {
        let result = creep.harvest(source);
        switch (result) {
            case OK:
                otherVisual.setSuccess(creep.room.visual, source.pos);

            case ERR_BUSY:
                // Игнорировать
                break;

            case ERR_NOT_IN_RANGE:
                creep.moveTo(source);
                break;

            case ERR_NOT_ENOUGH_RESOURCES:
                creep.say(otherConstantsStrings.creep.cant);
                otherVisual.setError(creep.room.visual, source.pos);
                break;

            default:
                console.log("Добыча источника " + source.id + " крипом " + creep.name + " не удалась, код ошибки " + otherConstantsErrors.errorCodeToText(result));
                creep.say(otherConstantsStrings.creep.error);
                otherVisual.setError(creep.room.visual, creep.pos);
                otherVisual.setError(creep.room.visual, source.pos);
                break;
        }
    },

    /**
     * Функция для добычи ближайшего источника энергии
     * @param {Creep} creep Крип, который будет добывать
     */
    harvestClosest: function(creep) {
        let sources = creep.room.find(FIND_SOURCES_ACTIVE);
        if (sources.length) {
            let source = creep.pos.findClosestByRange(sources);
            this.harvest(creep, source);
        } else {
            creep.say(otherConstantsStrings.creep.cant);
            otherVisual.setError(creep.room.visual, creep.pos);
        }
    },

    /**
     * Сложить энергию в хранилище.
     * @param {Creep} creep Крип, который будет складывать.
     * @param {Store} target Хранилище, в которое будут складывать.
     * @returns {Boolean} Возвращает true, если удалось сложить. Возвращает false, если не удалось.
     */
    _store: function(creep, target) {
        let result = creep.transfer(target, RESOURCE_ENERGY);
        switch (result) {
            case ERR_NOT_IN_RANGE:
                creep.moveTo(target);
                otherVisual.setSuccess(creep.room.visual, target.pos);
                return true;

            case ERR_BUSY:
                return true;

            default:
                console.log("Складывание на " + target.id + " крипом " + creep.name + " не удалось, код ошибки " + otherConstantsErrors.errorCodeToText(result));
                creep.say(otherConstantsStrings.creep.error);
                otherVisual.setError(creep.room.visual, creep.pos);
                otherVisual.setError(creep.room.visual, source.pos);
                return false;
        }
    },

    _storeTo: function(creep, findStructures, filterStructuresType) {
        let structures = _.filter(creep.room.find(findStructures), (object) => object.structureType == filterStructuresType);
        // Найти свободные
        let notFilled = _.filter(structures, (object) => object.store.getFreeCapacity(RESOURCE_ENERGY) > roleStaticEpoch.getEpoch(creep.room).energyMeasurementError.extension);
        if (notFilled.length) {
            let target;
            if (structures.length == 1) {
                target = structures[0];
            } else {
                // Наиболее свободный
                target = notFilled.reduce((prev, next) => prev.store.getFreeCapacity(RESOURCE_ENERGY) < next.store.getFreeCapacity(RESOURCE_ENERGY) ? next : prev);
            }
            return this._store(creep, target);
        }
        return false;
    },

    /**
     * Сложить энергию на спавн.
     * @param {Creep} creep Крип, который будет складывать.
     * @returns {Boolean} Возвращает true, если удалось сложить. Возвращает false, если не удалось.
     */
    storeToSpawn: function(creep) {
        return _storeTo(creep, FIND_MY_SPAWNS, STRUCTURE_SPAWN);
    },

    /**
     * Сложить энергию на расширение спавна.
     * @param {Creep} creep Крип, который будет складывать.
     * @returns {Boolean} Возвращает true, если удалось сложить. Возвращает false, если не удалось.
     */
    storeToExtension: function(creep) {
        return _storeTo(creep, FIND_MY_STRUCTURES, STRUCTURE_EXTENSION);
    },

    /**
     * Сложить энергию на 'склад'
     * @param {Creep} creep Крип, который будет складывать
     */
    store: function(creep) {
        let result = this.storeToSpawn(creep);
        if (!result) {
            result = this.storeToExtension(creep);
        } else {
            return;
        }

        creep.say(otherConstantsStrings.creep.cant);
        otherVisual.setError(creep.room.visual, creep.pos);
    },
};