const staticConstants = {
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
         * Специальная функция для вычисления 'уникального' значения для наименований.
         * @returns {String}
         */
        _time: () => (Game.time % 10000).toString(),

        /**
         * Добытчик
         * @returns {String}
         */
        harvester: () => "Harvester-" + staticConstants.roleCreepNames._time(),

        /**
         * Улучшатель
         * @returns {String}
         */
        upgrader: () => "Upgrader-" + staticConstants.roleCreepNames._time(),

        /**
         * Строитель
         * @returns {String}
         */
        builder: () => "Builder-" + staticConstants.roleCreepNames._time(),
    },
};

module.exports = staticConstants;