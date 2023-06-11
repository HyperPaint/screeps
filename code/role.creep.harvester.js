const constants = require("./other.constants");
const otherVisual = require("./other.visual");

module.exports = {
    /**
     * Функция для работы крипов.
     * Должна вызываться каждый тик.
     * @param {Creep} creep 
     */
    process: function(creep) {
        // Если есть свободное место
	    if(creep.store.getFreeCapacity(RESOURCE_ENERGY)) {
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
            room.memory.sources = { };
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
            spawn.room.memory.harvesters = { };
        }
        // Счётчик роли, если не создан
        if (spawn.room.memory.harvesters.counter == undefined) {
            spawn.room.memory.harvesters.counter = 0;
        }
        return { role: constants.roleNames.harvester, sourceId: this.initialSource(spawn.room, spawn.room.memory.harvesters.counter++) };
    },

    /**
     * Функция для добычи конкретного источника энергии
     * @param {Creep} creep Крип, который будет добывать
     * @param {Source} source Источник энергии
     */
    harvest: function(creep, source) {
        // Добывать
        let result = creep.harvest(source);
        switch (result) {
            // The operation has been scheduled successfully
            case OK:
                otherVisual.setSuccess(creep.room.visual, source.pos);
                break;
            
            // You are not the owner of this creep, or the room controller is owned or reserved by another player
            case ERR_NOT_OWNER:
                console.log("Крип " + creep.name + " или контроллер не принадлежат тебе");
                break;

            // The creep is still being spawned
            case ERR_BUSY:
                break;
            
            // Extractor not found. You must build an extractor structure to harvest minerals
            case ERR_NOT_FOUND:
                creep.say("Не нашел");
                otherVisual.setError(creep.room.visual, source.pos);
                break;

            // The target does not contain any harvestable energy or mineral
            case ERR_NOT_ENOUGH_RESOURCES:
                creep.say("Пусто");
                otherVisual.setError(creep.room.visual, source.pos);
                break;

            // The target is not a valid source or mineral object
            case ERR_INVALID_TARGET:
                creep.say("Не нашел");
                otherVisual.setError(creep.room.visual, source.pos);
                break;

            // The target is too far away
            case ERR_NOT_IN_RANGE:
                creep.moveTo(source);
                break;

            // The extractor or the deposit is still cooling down
            case ERR_TIRED:
                creep.say("Кулдаун");
                otherVisual.setError(creep.room.visual, source.pos);
                break;

            // There are no WORK body parts in this creep's body
            case ERR_NO_BODYPART:
                creep.say("Нет WORK");
                otherVisual.setError(creep.room.visual, creep.pos);
                break;

            default:
                console.log("Не удалось добыть источник, код ошибки " + result);
                break;
        }
    },

    /**
     * Функция для добычи ближайшего источника энергии
     * @param {Creep} creep Крип, который будет добывать
     */
    harvestClosest: function(creep) {
        // Найти источники энергии
        let sources = creep.room.find(FIND_SOURCES_ACTIVE);
        if (sources.length) {
            // Найти ближний
            let source = creep.pos.findClosestByPath(sources);
            this.harvest(creep, source);
        } else {
            creep.say("Не нашел");
        }
    },

    /**
     * Сложить энергию на спавн
     * @param {Creep} creep Крип, который будет складывать
     * @returns {Boolean} Возвращает true, если удалось сложить. Возвращает false, если не удалось.
     */
    storeToSpawn: function(creep) {
        let structures = creep.room.find(FIND_MY_SPAWNS);
        // Найти свободные
        let notFilled = _.filter(structures, (object) => { return object.store.getFreeCapacity(RESOURCE_ENERGY) > constants.epochs[0].energyMeasurementError.spawn; } );
        // Если есть свободные
        if (notFilled.length) {
            let target;
            // Если один
            if (structures.length == 1) {
                target = structures[0];
            // Если несколько
            } else {
                // Наиболее свободный
                target = notFilled.reduce((prev, next) => prev.store.getFreeCapacity(RESOURCE_ENERGY) < next.store.getFreeCapacity(RESOURCE_ENERGY) ? next : prev);
            }
            // Отнести
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                otherVisual.setSuccess(creep.room.visual, target.pos);
            }
            return true;
        }
        return false;
    },

    /**
     * Сложить энергию на расширение спавна
     * @param {Creep} creep Крип, который будет складывать
     * @returns {Boolean} Возвращает true, если удалось сложить. Возвращает false, если не удалось.
     */
    storeToExtension: function(creep) {
        let structures = _.filter(creep.room.find(FIND_MY_STRUCTURES), (object) => { return object.structureType == STRUCTURE_EXTENSION } );
        // Найти свободные
        let notFilled = _.filter(structures, (object) => { return object.store.getFreeCapacity(RESOURCE_ENERGY) > constants.epochs[0].energyMeasurementError.extension; } );
        // Если есть свободные
        if (notFilled.length) {
            let target;
            // Если один
            if (structures.length == 1) {
                target = structures[0];
            // Если несколько
            } else {
                // Наиболее свободный
                target = notFilled.reduce((prev, next) => prev.store.getFreeCapacity(RESOURCE_ENERGY) < next.store.getFreeCapacity(RESOURCE_ENERGY) ? next : prev);
            }
            // Отнести
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                otherVisual.setSuccess(creep.room.visual, target.pos);
            }
            return true;
        }
        return false;
    },

    /**
     * Сложить энергию на 'склад'
     * @param {Creep} creep Крип, который будет складывать
     */
    store: function(creep) {
        let result = this.storeToSpawn(creep);
        if (! result) {
            result = this.storeToExtension(creep);
        } else {
            return;
        }
        
        creep.say("Нет места");
        otherVisual.setError(creep.room.visual, creep.pos);
    },
};