const libVisual = {
    /* Метки */
    successText: "✔",
    errorText: "✘",

    attackText: "🏹",
    buildText: "🔨",
    claimControllerText: "🔩",
    dismantleText: "💣",
    generateSafeModeText: "🔩",
    harvestText: "⛏️",
    healText: "💊",
    pickupText: "📤",
    repairText: "🔧",
    reserveControllerText: "🔩",
    signControllerText: "🔤",
    transferText: "📥",
    upgradeControllerText: "🔩",
    withdrawText: "📤",

    spawnText: "🛠️",

    /* Стили меток */
    successStyle: { color: "green", backgroundColor: "#00000000", opacity: 0.5 },
    errorStyle: { color: "red", backgroundColor: "#00000000", opacity: 0.5 },

    attackStyle: { color: "white", backgroundColor: "#00000000", opacity: 1.0 },
    buildStyle: { color: "white", backgroundColor: "#00000000", opacity: 1.0 },
    claimControllerStyle: { color: "white", backgroundColor: "#00000000", opacity: 1.0 },
    dismantleStyle: { color: "white", backgroundColor: "#00000000", opacity: 1.0 },
    generateSafeModeStyle: { color: "white", backgroundColor: "#00000000", opacity: 1.0 },
    harvestStyle: { color: "white", backgroundColor: "#00000000", opacity: 1.0 },
    healStyle: { color: "white", backgroundColor: "#00000000", opacity: 1.0 },
    pickupStyle: { color: "white", backgroundColor: "#00000000", opacity: 1.0 },
    repairStyle: { color: "white", backgroundColor: "#00000000", opacity: 1.0 },
    reserveControllerStyle: { color: "white", backgroundColor: "#00000000", opacity: 1.0 },
    signControllerStyle: { color: "white", backgroundColor: "#00000000", opacity: 1.0 },
    transferStyle: { color: "white", backgroundColor: "#00000000", opacity: 1.0 },
    upgradeControllerStyle: { color: "white", backgroundColor: "#00000000", opacity: 1.0 },
    withdrawStyle: { color: "white", backgroundColor: "#00000000", opacity: 1.0 },

    /* Стили пути */

    defaulPathStyle: { stroke: '#fff' },
    redPathStyle: { stroke: '#f00' }, // Для атаки
    greenPathStyle: { stroke: '#0f0' }, // Для лечения
    bluePathStyle: { stroke: '#00f' }, // Для работы с контроллером

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

    /**
     * Установить метку строительства.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setBuild: function(roomVisual, roomPosition) {
        roomVisual.text(this.buildText, roomPosition, this.buildStyle);
    },

    /**
     * Установить метку захвата контроллера.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setClaimController: function(roomVisual, roomPosition) {
        roomVisual.text(this.claimControllerText, roomPosition, this.claimControllerStyle);
    },

    /**
     * Установить метку демонтирования.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setDismantle: function(roomVisual, roomPosition) {
        roomVisual.text(this.dismantleText, roomPosition, this.dismantleStyle);
    },

    /**
     * Установить метку создания безопасного режима.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setGenerateSafeMode: function(roomVisual, roomPosition) {
        roomVisual.text(this.generateSafeModeText, roomPosition, this.generateSafeModeStyle);
    },

    /**
     * Установить метку добычи.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setHarvest: function(roomVisual, roomPosition) {
        roomVisual.text(this.harvestText, roomPosition, this.harvestStyle);
    },

    /**
     * Установить метку лечения.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setHeal: function(roomVisual, roomPosition) {
        roomVisual.text(this.healText, roomPosition, this.healStyle);
    },

    /**
     * Установить метку поднятия с пола ресурсов.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setPickup: function(roomVisual, roomPosition) {
        roomVisual.text(this.pickupText, roomPosition, this.pickupStyle);
    },

    /**
     * Установить метку починки.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setRepair: function(roomVisual, roomPosition) {
        roomVisual.text(this.repairText, roomPosition, this.repairStyle);
    },

    /**
     * Установить метку блокирования контроллера к захвату.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setReserveController: function(roomVisual, roomPosition) {
        roomVisual.text(this.reserveControllerText, roomPosition, this.reserveControllerStyle);
    },

    /**
     * Установить метку создания подписи на комнате.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setSignController: function(roomVisual, roomPosition) {
        roomVisual.text(this.signControllerText, roomPosition, this.signControllerStyle);
    },

    /**
     * Установить метку передачи ресурсов.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setTransfer: function(roomVisual, roomPosition) {
        roomVisual.text(this.transferText, roomPosition, this.transferStyle);
    },

    /**
     * Установить метку улучшения контроллера.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setUpgradeController: function(roomVisual, roomPosition) {
        roomVisual.text(this.upgradeControllerText, roomPosition, this.upgradeControllerStyle);
    },

    /**
     * Установить метку изъятия ресурсов.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setWithdraw: function(roomVisual, roomPosition) {
        roomVisual.text(this.withdrawText, roomPosition, this.withdrawStyle);
    },

    /**
     * Установить метку работы спавна.
     * @param {RoomVisual} roomVisual 
     * @param {RoomPosition} roomPosition 
     */
    setSpawnWorking: function(text, roomVisual, roomPosition) {
        roomVisual.text(this.spawnText + text + this.spawnText, roomPosition.x, roomPosition.y + 1.5);
    },
};

module.exports = libVisual;