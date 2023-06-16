const staticRoom = require("./static.room");

const staticEpoch = {   
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
     * Функция для вычисления эпохи текущей комнаты.
     * Эпоха вычисляется раз в несколько вызовов, обычно возвращается кэшированное значение.
     * @param {Room} room Комната в которой требуется вычислить эпоху развития.
     * @return {Epoch} Возвращает эпоху соответствующую текущему развитию.
     */
    getEpoch: function(room) {
        const epochs = staticEpoch.getEpochs(room);
        /* Вычисление эпохи */
        return epochs[1];
    },

    /**
     * Функция для вычисления массива эпох текущей комнаты.
     * @param {Room} room Комната в которой требуется вычислить все эпохи развития.
     * @returns {Epoch} Возвращает массив эпох соответствующий текущей комнате.
     */
    getEpochs: function(room) {
        if (room.memory.sources == undefined) {
            staticRoom.memorySources(room);
        }
        const sourcesCount = room.memory.sources.count;
        /**
         * @type {Epoch[]} Массив эпох для текущей комнаты.
         */
        const epochs = [
            // 0
            {
                creepsBodies: {
                    harvester: [WORK, CARRY, MOVE],
                    upgrader: [WORK, CARRY, MOVE, MOVE],
                },
    
                creepsCounts: {
                    harvester: sourcesCount,
                    upgrader: sourcesCount,
                    builder: 0,
                },
            },
    
            // 1
            { 
                creepsBodies: {
                    harvester: [WORK, CARRY, MOVE, MOVE],
                    upgrader: [WORK, CARRY, MOVE, MOVE],
                    builder: [WORK, CARRY, MOVE, MOVE],
                },
    
                creepsCounts: {
                    harvester: sourcesCount,
                    upgrader: 2,
                    builder: 2,
                },
            }
        ]
        return epochs;
    },
}

module.exports = staticEpoch;