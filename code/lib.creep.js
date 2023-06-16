const libVisual = require("./lib.visual");
const staticRoom = require("./static.room");
const staticStrings = require("./static.strings");

const libCreep = {
    /**
     * Функция вернёт один из ID источников энергии, которые крип в будущем может пытаться использовать.
     * @param {Room} room Комната, в которой требуется выбрать источник
     * @param {Number} counter Счётчик, используемый для балансировки. Может быть любым числом.
     * @returns {ID} Идентификатор источника энергии.
     */
    getRandomSource: function(room, counter) {
        if (room.memory.sources == undefined) {
            staticRoom.memorySources(room);
        }
        const memory = room.memory.sources;
        return memory[counter % room.memory.sources.count];
    },

    /**
     * Функция для следования крипа к цели и атаки.
     * @param {Creep} creep Крип для следования и атаки.
     * @param {ID} targetId Цель для крипа.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    attack: function(creep, targetId) {
        const target = Game.getObjectById(targetId);
        const result = creep.attack(target);
        switch (result) {
            case ERR_NOT_IN_RANGE:
                // Атака требует максимально скоординированных действий
                creep.moveTo(target, { reusePath: 0, visualizePathStyle: libVisual.redPathStyle } );
            case OK:
                libVisual.setAttack(creep.room.visual, target.pos);
            case ERR_BUSY:
                return true;

            default:
                console.log(staticStrings.console.creepCannotAttack(creep, targetId, result));
                libVisual.setError(creep.room.visual, target.pos);
                return false;
        }
    },

    /**
     * Функция для следования крипа к контроллеру и атаки контроллера.
     * @param {Creep} creep Крип для следования и атаки контроллера.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    attackController: function(creep) {
        const target = creep.room.controller;
        const result = creep.attackController(target);
        switch (result) {
            case ERR_NOT_IN_RANGE:
                // Атака требует максимально скоординированных действий
                creep.moveTo(target, { reusePath: 0, visualizePathStyle: libVisual.bluePathStyle } );
            case OK:
                libVisual.setAttack(creep.room.visual, target.pos);
            case ERR_BUSY:
            case ERR_TIRED:
                return true;

            default:
                console.log(staticStrings.console.creepCannotAttack(creep, targetId, result));
                libVisual.setError(creep.room.visual, target.pos);
                return false;
        }
    },

    /**
     * Функция для следования крипа к цели и строительства.
     * @param {Creep} creep Крип для следования и строительства.
     * @param {ID} targetId Цель для крипа.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    build: function(creep, targetId) {
        const target = Game.getObjectById(targetId);
        const result = creep.build(target);
        switch (result) {
            case ERR_NOT_IN_RANGE:
                creep.moveTo(target, { visualizePathStyle: libVisual.defaulPathStyle } );
            case OK:
                libVisual.setBuild(creep.room.visual, target.pos);
            case ERR_BUSY:
                return true;

            case ERR_NOT_ENOUGH_RESOURCES:
                libVisual.setError(creep.room.visual, target.pos);
                return false;

            default:
                console.log(staticStrings.console.creepCannotBuild(creep, targetId, result));
                libVisual.setError(creep.room.visual, target.pos);
                return false;
        }
    },

    /**
     * Функция для следования крипа к контроллеру и захвата контроллера.
     * @param {Creep} creep Крип для следования и захвата контроллера.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    claimController: function(creep) {
        const target = creep.room.controller;
        const result = creep.claimController(target);
        switch (result) {
            case ERR_NOT_IN_RANGE:
                creep.moveTo(target, { visualizePathStyle: libVisual.bluePathStyle } );
            case OK:
                libVisual.setClaimController(creep.room.visual, target.pos);
            case ERR_BUSY:
                return true;

            default:
                console.log(staticStrings.console.creepCannotClaimController(creep, targetId, result));
                libVisual.setError(creep.room.visual, target.pos);
                return false;
        }
    },

    /**
     * Функция для следования крипа к цели и демонтирования.
     * @param {Creep} creep Крип для следования и демонтирования.
     * @param {ID} targetId Цель для крипа.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    dismantle: function(creep, targetId) {
        const target = Game.getObjectById(targetId);
        const result = creep.dismantle(target);
        switch (result) {
            case ERR_NOT_IN_RANGE:
                creep.moveTo(target, { visualizePathStyle: libVisual.defaulPathStyle } );
            case OK:
                libVisual.setDismantle(creep.room.visual, target.pos);
            case ERR_BUSY:
                return true;

            default:
                console.log(staticStrings.console.creepCannotDismatle(creep, targetId, result));
                libVisual.setError(creep.room.visual, target.pos);
                return false;
        }
    },

    /**
     * Функция для следования крипа к цели и создания безопасного режима.
     * @param {Creep} creep Крип для следования и создания безопасного режима.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    generateSafeMode: function(creep) {
        const target = creep.room.controller;
        const result = creep.generateSafeMode(target);
        switch (result) {
            case ERR_NOT_IN_RANGE:
                creep.moveTo(target, { visualizePathStyle: libVisual.bluePathStyle } );
            case OK:
                libVisual.setGenerateSafeMode(creep.room.visual, target.pos);
            case ERR_BUSY:
                return true;

            default:
                console.log(staticStrings.console.creepCannotGenerateSafeMode(creep, targetId, result));
                libVisual.setError(creep.room.visual, target.pos);
                return false;
        }
    },

    /**
     * Функция для следования крипа к цели и добычи.
     * @param {Creep} creep Крип для следования и добычи.
     * @param {ID} targetId Цель для крипа.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    harvest: function(creep, targetId) {
        const target = Game.getObjectById(targetId);
        const result = creep.harvest(target);
        switch (result) {
            case ERR_NOT_IN_RANGE:
                creep.moveTo(target, { visualizePathStyle: libVisual.defaulPathStyle } );
            case OK:
                libVisual.setHarvest(creep.room.visual, target.pos);
            case ERR_BUSY:
            case ERR_TIRED:
                return true;

            case ERR_NOT_ENOUGH_RESOURCES:
                libVisual.setError(creep.room.visual, target.pos);
                return false;

            default:
                console.log(staticStrings.console.creepCannotHarvest(creep, targetId, result));
                libVisual.setError(creep.room.visual, target.pos);
                return false;
        }
    },

    /**
     * Функция для следования крипа к цели и лечения.
     * @param {Creep} creep Крип для следования и лечения.
     * @param {ID} targetId Цель для крипа.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    heal(creep, targetId) {
        const target = Game.getObjectById(targetId);
        const result = creep.heal(target);
        switch (result) {
            case ERR_NOT_IN_RANGE:
                // Атака требует максимально скоординированных действий
                creep.moveTo(target, { reusePath: 0, visualizePathStyle: libVisual.greenPathStyle } );
            case OK:
                libVisual.setHeal(creep.room.visual, target.pos);
            case ERR_BUSY:
                return true;

            default:
                console.log(staticStrings.console.creepCannotHeal(creep, targetId, result));
                libVisual.setError(creep.room.visual, target.pos);
                return false;
        }
    },

    /**
     * Функция для следования крипа к цели и поднятия с пола ресурсов.
     * @param {Creep} creep Крип для следования и поднятия с пола ресурсов.
     * @param {ID} targetId Цель для крипа.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    pickup(creep, targetId) {
        const target = Game.getObjectById(targetId);
        const result = creep.pickup(target);
        switch (result) {
            case ERR_NOT_IN_RANGE:
                creep.moveTo(target, { visualizePathStyle: libVisual.defaulPathStyle } );
            case OK:
                libVisual.setPickup(creep.room.visual, target.pos);
            case ERR_BUSY:
                return true;

            case ERR_FULL:
                libVisual.setError(creep.room.visual, creep.pos);
                return false;

            default:
                console.log(staticStrings.console.creepCannotPickup(creep, targetId, result));
                libVisual.setError(creep.room.visual, target.pos);
                return false;
        }
    },

    /**
     * Функция для следования крипа к цели и перетаскивания другого крипа за собой.
     * @param {Creep} creep Крип для следования и перетаскивания другого крипа за собой.
     * @param {Creep} pulledCreep Перетаскиваемый крип.
     * @param {RoomPosition} targetPos Целевая позиция в комнате.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    pull: function(creep, pulledCreep, targetPos) {
        console.log(staticStrings.console.notRealized(creep, pulledCreep.id));
        return false;
    },

    /**
     * Функция для следования крипа к цели и дальней атаки.
     * @param {Creep} creep Крип для следования и дальней атаки.
     * @param {ID} targetId Цель для крипа.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    rangedAttack: function(creep, targetId) {
        const target = Game.getObjectById(targetId);
        const result = creep.rangedAttack(target);
        switch (result) {
            case ERR_NOT_IN_RANGE:
                // Атака требует максимально скоординированных действий
                creep.moveTo(target, { reusePath: 0, visualizePathStyle: libVisual.redPathStyle } );
            case OK:
                libVisual.setAttack(creep.room.visual, target.pos);
            case ERR_BUSY:
                return true;

            default:
                console.log(staticStrings.console.creepCannotAttack(creep, targetId, result));
                libVisual.setError(creep.room.visual, target.pos);
                return false;
        }
    },

    /**
     * Функция для следования крипа к цели и дальнего лечения.
     * @param {Creep} creep Крип для следования и дальнего лечения.
     * @param {ID} targetId Цель для крипа.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    rangedHeal: function(creep, targetId) {
        const target = Game.getObjectById(targetId);
        const result = creep.heal(target);
        switch (result) {
            case ERR_NOT_IN_RANGE:
                // Атака требует максимально скоординированных действий
                creep.moveTo(target, { reusePath: 0, visualizePathStyle: libVisual.greenPathStyle } );
            case OK:
                libVisual.setHeal(creep.room.visual, target.pos);
            case ERR_BUSY:
                return true;

            default:
                console.log(staticStrings.console.creepCannotHeal(creep, targetId, result));
                libVisual.setError(creep.room.visual, target.pos);
                return false;
        }
    },

    /**
     * Функция для следования крипа к цели и починки.
     * @param {Creep} creep Крип для следования и починки.
     * @param {ID} targetId Цель для крипа.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    repair: function(creep, targetId) {
        const target = Game.getObjectById(targetId);
        const result = creep.repair(target);
        switch (result) {
            case ERR_NOT_IN_RANGE:
                creep.moveTo(target, { visualizePathStyle: libVisual.defaulPathStyle } );
            case OK:
                libVisual.setRepair(creep.room.visual, target.pos);
            case ERR_BUSY:
                return true;

            case ERR_NOT_ENOUGH_RESOURCES:
                libVisual.setError(creep.room.visual, target.pos);
                return false;

            default:
                console.log(staticStrings.console.creepCannotRepair(creep, targetId, result));
                libVisual.setError(creep.room.visual, target.pos);
                return false;
        }
    },

    /**
     * Функция для следования крипа к контроллеру и блокирования контроллера к захвату.
     * @param {Creep} creep Крип для следования и блокирования контроллера к захвату.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    reserveController: function(creep) {
        const target = creep.room.controller;
        console.log(staticStrings.console.notRealized(creep, target.id));
        return false;
    },

    /**
     * Функция для следования крипа к контроллеру и создания подписи на комнате.
     * @param {Creep} creep Крип для следования и создания подписи на комнате.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    signController: function(creep, text) {
        const target = creep.room.controller;
        console.log(staticStrings.console.notRealized(creep, target.id));
        return false;
    },

    /**
     * Функция для следования крипа к цели и передачи ресурсов.
     * @param {Creep} creep Крип для следования и передачи ресурсов.
     * @param {ID} targetId Цель для крипа.
     * @param {Number} resourceType Тип ресурса для передачи.
     * @param {Number} amount Количество ресурса для передачи.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    transfer: function(creep, targetId, resourceType = RESOURCE_ENERGY, amount = "*") {
        const target = Game.getObjectById(targetId);
        let result;
        if (amount == "*") {
            result = creep.transfer(target, resourceType);
        } else {
            result = creep.transfer(target, resourceType, amount);
        }
        switch (result) {
            case ERR_NOT_IN_RANGE:
                creep.moveTo(target, { visualizePathStyle: libVisual.defaulPathStyle } );
            case OK:
                libVisual.setTransfer(creep.room.visual, target.pos);
            case ERR_BUSY:
                return true;

            case ERR_NOT_ENOUGH_RESOURCES:
                libVisual.setError(creep.room.visual, creep.pos);
                return false;

            case ERR_FULL:
                libVisual.setError(creep.room.visual, target.pos);
                return false;

            default:
                console.log(staticStrings.console.creepCannotTransfer(creep, targetId, result));
                libVisual.setError(creep.room.visual, target.pos);
                return false;
        }
    },

    /**
     * Функция для следования крипа к контроллеру и улучшения контроллера.
     * @param {Creep} creep Крип для следования и улучшения контроллера.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    upgradeController: function(creep) {
        const target = creep.room.controller;
        const result = creep.upgradeController(target);
        switch (result) {
            case ERR_NOT_IN_RANGE:
                creep.moveTo(target, { visualizePathStyle: libVisual.bluePathStyle } );
            case OK:
                libVisual.setUpgradeController(creep.room.visual, target.pos);
            case ERR_BUSY:
                return true;

            case ERR_NOT_ENOUGH_RESOURCES:
                libVisual.setError(creep.room.visual, creep.pos);
                return false;

            default:
                console.log(staticStrings.console.creepCannotUpgradeController(creep, target.id, result));
                libVisual.setError(creep.room.visual, target.pos);
                return false;
        }
    },

    /**
     * Функция для следования крипа к цели и изъятия ресурсов.
     * @param {Creep} creep Крип для следования и изъятия ресурсов.
     * @param {ID} targetId Цель для крипа.
     * @param {Number} resourceType Тип ресурса для изъятия.
     * @param {Number} amount Количество ресурса для изъятия.
     * @returns {Boolean} Возвращает true, если удалось выполнить действие, false, если нет.
     */
    withdraw: function(creep, targetId, resourceType = RESOURCE_ENERGY, amount = "*") {
        const target = Game.getObjectById(targetId);
        let result;
        if (amount == "*") {
            result = creep.withdraw(target, resourceType);
        } else {
            result = creep.withdraw(target, resourceType, amount);
        }
        switch (result) {
            case ERR_NOT_IN_RANGE:
                creep.moveTo(target, { visualizePathStyle: libVisual.defaulPathStyle } );
            case OK:
                libVisual.setWithdraw(creep.room.visual, target.pos);
            case ERR_BUSY:
                return true;

            case ERR_NOT_ENOUGH_RESOURCES:
                libVisual.setError(creep.room.visual, target.pos);
                return false;

            case ERR_FULL:
                libVisual.setError(creep.room.visual, creep.pos);
                return false;

            default:
                console.log(staticStrings.console.creepCannotWithdraw(creep, targetId, result));
                libVisual.setError(creep.room.visual, target.pos);
                return false;
        }
    }
};

module.exports = libCreep;