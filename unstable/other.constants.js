const otherConstants = {
    /**
     * Объект представляющий эпоху.
     * @typedef {Object} Epoch
     * @property {CreepBodies} creepBodies Коллекция тел крипов для разных ролей.
     * @property {CreepCounts} creepCounts Коллекция заявленного количества крипов для разных ролей.
     * @property {EnergyMeasurementError} energyMeasurementError Коллекция ошибок при измерении энергии для разных хранилищ.
     */

    /**
     * Коллекция тел крипов для разных ролей.
     * @typedef {Object} CreepBodies 
     * @property {Number[]} harvester Тело добытчика.
     * @property {Number[]} upgrader Тело улучшателя.
     */

    /**
     * Коллекция заявленного количества крипов для разных ролей.
     * @typedef {Object} CreepCounts 
     * @property {Number} harvester Количество добытчиков.
     * @property {Number} upgrader Количество улучшателей.
     */

    /**
     * Коллекция ошибок при измерении энергии для разных хранилищ.
     * Ошибка при измерении энергии - число, которое можно игнорировать и считать хранилище заполненным до конца.
     * @typedef {Object} EnergyMeasurementError 
     * @property {Number} spawn Ошибка при измерении энергии в спавне.
     * @property {Number} extension Ошибка при измерении энергии в расширении спавна.
     */

    /**
     * Массив эпох начиная с нулевой.
     * @type {Epoch[]}
     */
    epochs: [
        // 0
        {
            creepBodies: {
                harvester: [WORK, CARRY, MOVE, MOVE],
                upgrader: [WORK, CARRY, MOVE, MOVE],
            },

            creepCounts: {
                harvester: 1,
                upgrader: 2,
            },

            energyMeasurementError: {
                spawn: 0,
                extension: 0,
            },
        },

        // 1
        { 
            creepBodies: {
                harvester: [WORK, CARRY, MOVE, MOVE],
                upgrader: [WORK, CARRY, MOVE, MOVE],
            },

            creepCounts: {
                harvester: 1,
                upgrader: 2,
            },

            energyMeasurementError: {
                spawn: 0,
                extension: 0,
            },
        }
    ],

    /**
     * Список наименований ролей крипов.
     * @type {Object}
     */
    roleNames: {
        /**
         * Добытчик
         * @type {String}
         */
        harvester: "harvester",

        /**
         * Улучшатель
         * @type {String}
         */
        upgrader: "upgrader",
    },

    /**
     * Шаблонный список наименований по ролям для крипов.
     * @type {Object}
     */
    roleCreepNames: {
        /**
         * Добытчик
         * @returns {String}
         */
        harvester: () => "Harvester-" + otherConstants.roleCreepNames._time(),

        /**
         * Улучшатель
         * @returns {String}
         */
        upgrader: () => "Upgrader-" + otherConstants.roleCreepNames._time(),

        /**
         * Специальная функция для вычисления 'уникального' значения для наименований.
         * @returns {String}
         */
        _time: () => (Game.time % 10000).toString(),
    },

    /**
     * Коллекция содержащая все реплики крипов и сообщений для отправки в консоль.
     * @type {Object}
     */
    strings: {
        /**
         * Реплики крипов.
         * Ограничение 10 символов.
         * @type {CollectionStrings}
         */
        creep: {

        },

        /**
         * Шаблонные сообщения в консоль.
         * @type {CollectionStrings}
         */
        console: {

        },
    },
};

module.exports = otherConstants;