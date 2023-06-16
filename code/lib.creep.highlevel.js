const libCreep = require("./lib.creep");

const libCreepHighLevel = {
    /**
     * Функция для складывания крипом ресурсов на склад определённых строений.
     * @param {Creep} creep Крип для складывания ресурсов.
     * @param {Number} findStructures Структуры, которые следует искать.
     * @param {Number} filterStructuresType Тип структур, которые следует отфильтровать от искомых.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    store: function(creep, findStructures, filterStructuresType) {
        // Найти структуры
        const structures = _.filter(creep.room.find(findStructures), (object) => object.structureType == filterStructuresType);
        // Найти свободные
        const notFilled = _.filter(structures, (object) => object.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
        if (notFilled.length) {
            // Есть свободные
            let target;
            if (structures.length == 1) {
                // Единственный свободный
                target = structures[0];
            } else {
                // Наиболее свободный
                target = notFilled.reduce((prev, next) => prev.store.getFreeCapacity(RESOURCE_ENERGY) > next.store.getFreeCapacity(RESOURCE_ENERGY) ? prev : next);
            }
            return libCreep.transfer(creep, target.id);
        } else {
            // Нет свободных
            return false;
        }
    },

    /**
     * Функция для взятия крипом ресурсов со склада определённых строений.
     * @param {Creep} creep Крип для взятия ресурсов.
     * @param {Number} findStructures Структуры, которые следует искать.
     * @param {Number} filterStructuresType Тип структур, которые следует отфильтровать от искомых.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    spend: function(creep, findStructures, filterStructuresType) {
        // Найти структуры
        const structures = _.filter(creep.room.find(findStructures), (object) => object.structureType == filterStructuresType);
        // Найти не пустые
        const notFilled = _.filter(structures, (object) => object.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
        if (notFilled.length) {
            // Есть не пустые
            let target;
            if (structures.length == 1) {
                // Единственный не пустой
                target = structures[0];
            } else {
                // Наиболее не пустой
                target = notFilled.reduce((prev, next) => prev.store.getUsedCapacity(RESOURCE_ENERGY) > next.store.getUsedCapacity(RESOURCE_ENERGY) ? prev : next);
            }
            return libCreep.transfer(creep, target.id);
        } else {
            // Нет не пустых
            return false;
        }
    },

    /**
     * Функция для строительства крипом определённых строений.
     * @param {Creep} creep Крип для строительства ресурсов.
     * @param {Number} findStructures Структуры, которые следует искать.
     * @param {Number} filterStructuresType Тип структур, которые следует отфильтровать от искомых.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    build: function(creep, findStructures, filterStructuresType) {
        // Найти структуры
        const structures = _.filter(creep.room.find(findStructures), (object) => object.structureType == filterStructuresType);
        if (structures.length) {
            // Есть структуры
            let target;
            if (structures.length == 1) {
                // Единственная
                target = structures[0];
            } else {
                // Наиболее построенная
                target = structures.reduce((prev, next) => prev.progress > next.progress ? prev : next);
            }
            return libCreep.build(creep, target.id);
        } else {
            // Нет структур
            return false;
        }
    },

    /**
     * Функция для починки крипом определённых строений.
     * @param {Creep} creep Крип для починки ресурсов.
     * @param {Number} findStructures Структуры, которые следует искать.
     * @param {Number} filterStructuresType Тип структур, которые следует отфильтровать от искомых.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    repair: function(creep, findStructures, filterStructuresType) {
        // Найти структуры
        const structures = _.filter(creep.room.find(findStructures), (object) => object.structureType == filterStructuresType);
        const needRepair = _.filter(creep.room.find(findStructures), (object) => object.hits != object.hitsMax);
        if (needRepair.length) {
            // Есть структуры
            let target;
            if (structures.length == 1) {
                // Единственная
                target = structures[0];
            } else {
                // Наиболее поломанная
                target = structures.reduce((prev, next) => prev.progress < next.progress ? prev : next);
            }
            return libCreep.repair(creep, target.id);
        } else {
            // Нет структур
            return false;
        }
    },
}

module.exports = libCreepHighLevel;