const otherConstants = require("./other.constants");

const roleStaticEpoch = {    
    /**
     * Функция для вычисления уровня развития текущей комнаты.
     * Уровень развития вычисляется раз в несколько вызовов, обычно возвращается закэшированное значение.
     * @param {Room} room Комната в которой требуется вычислить уровень развития.
     * @return {Epoch} Возвращает объект эпохи соответствующий текущему развитию.
     */
    getEpoch: (room) => {
        return otherConstants.epochs[1];
    },
}

module.exports = roleStaticEpoch;