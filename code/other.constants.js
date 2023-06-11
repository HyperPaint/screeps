const otherConstants = {
    /**
     * Объект представляющий эпоху.
     * @typedef {Object} Epoch
     * @property {CreepsBodies} creepsBodies Коллекция тел крипов для разных ролей.
     * @property {CreepsCounts} creepsCounts Коллекция заявленного количества крипов для разных ролей.
     * @property {EnergyMeasurementError} energyMeasurementError Коллекция ошибок при измерении энергии для разных хранилищ.
     */

    /**
     * Коллекция тел крипов для разных ролей.
     * @typedef {Object} CreepsBodies 
     * @property {Number[]} harvester Тело добытчика.
     * @property {Number[]} upgrader Тело улучшателя.
     * @property {Number[]} builder Тело строителя.
     */

    /**
     * Коллекция заявленного количества крипов для разных ролей.
     * @typedef {Object} CreepsCounts 
     * @property {Number} harvester Количество добытчиков.
     * @property {Number} upgrader Количество улучшателей.
     * @property {Number} builder Количество строителей.
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
            creepsBodies: {
                harvester: [WORK, CARRY, MOVE, MOVE],
                upgrader: [WORK, CARRY, CARRY, MOVE],
            },

            creepsCounts: {
                harvester: 1,
                upgrader: 2,
                builder: 0,
            },

            energyMeasurementError: {
                spawn: 0,
                extension: 0,
            },
        },

        // 1
        { 
            creepsBodies: {
                harvester: [WORK, CARRY, MOVE, MOVE],
                upgrader: [WORK, CARRY, CARRY, MOVE],
                builder: [WORK, CARRY, CARRY, MOVE],
            },

            creepsCounts: {
                harvester: 1,
                upgrader: 2,
                builder: 2,
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

        /**
         * Строитель
         * @type {String}
         */
        builder: "builder",
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
         * Строитель
         * @returns {String}
         */
        builder: () => "Builder-" + otherConstants.roleCreepNames._time(),

        /**
         * Специальная функция для вычисления 'уникального' значения для наименований.
         * @returns {String}
         */
        _time: () => (Game.time % 10000).toString(),
    },
};

module.exports = otherConstants;