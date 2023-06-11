const otherVisual = {
    // Метки
    successText: "✔",
    errorText: "✘",
    attackText: "ATTACK",
    
    // Стили меток
    successStyle: { color: "green", backgroundColor: "#ffffff00", opacity: 0.5 },
    errorStyle: { color: "red", backgroundColor: "#ffffff00", opacity: 0.5 },
    attackStyle: { font: "0.225 Arial", color: "white", backgroundColor: "#ffffff00", opacity: 1.0 },

    /**
     * Установить метку успеха.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setSuccess: function(roomVisual, roomPosition) {
        roomVisual.text(this.successText, roomPosition, this.successStyle);
    },

    /**
     * Установить метку ошибки.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setError: function(roomVisual, roomPosition) {
        roomVisual.text(this.errorText, roomPosition, this.errorStyle);
    },

    /**
     * Установить метку атаки.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setAttack: function(roomVisual, roomPosition) {
        roomVisual.text(this.attackText, roomPosition, this.attackStyle);
    },
};

module.exports = otherVisual;