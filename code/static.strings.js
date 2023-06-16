const { errorCodeToText } = require("./static.errors");

const staticStrings = {
    /**
     * Реплики крипов.
     * Ограничение 10 символов.
     * @type {String[]}
     */
    creep: {
        frog: "ква",
        cannot: "не могу",
        error: "ошибка",
    },

    /**
     * Шаблонные сообщения в консоль.
     * @type {Function[]}
     */
    console: {
        notRealized: (object, targetId, errorCode = 0) => `Объект ${object.id} не может работать с объектом ${targetId}, функция не реализована, ошибка ${errorCodeToText(errorCode)}`,

        creepCannotAttack: (creep, targetId, errorCode) => `Крип ${creep.name} не может атаковать цель ${targetId}, ошибка ${errorCodeToText(errorCode)}`,
        creepCannotBuild: (creep, targetId, errorCode) => `Крип ${creep.name} не может строить объект ${targetId}, ошибка ${errorCodeToText(errorCode)}`,
        creepCannotClaimController: (creep, targetId, errorCode) => `Крип ${creep.name} не может захватить контроллер ${targetId}, ошибка ${errorCodeToText(errorCode)}`,
        creepCannotDismatle: (creep, targetId, errorCode) => `Крип ${creep.name} не может разбирать объект ${targetId}, ошибка ${errorCodeToText(errorCode)}`,
        creepCannotGenerateSafeMode: (creep, targetId, errorCode) => `Крип ${creep.name} не может создать безопасный режим в контроллере ${targetId}, ошибка ${errorCodeToText(errorCode)}`,
        creepCannotHarvest: (creep, targetId, errorCode) => `Крип ${creep.name} не может добывать ${targetId}, ошибка ${errorCodeToText(errorCode)}`,
        creepCannotHeal: (creep, targetId, errorCode) => `Крип ${creep.name} не может лечить ${targetId}, ошибка ${errorCodeToText(errorCode)}`,
        creepCannotPickup: (creep, targetId, errorCode) => `Крип ${creep.name} не может подбирать ${targetId}, ошибка ${errorCodeToText(errorCode)}`,
        creepCannotRepair: (creep, targetId, errorCode) => `Крип ${creep.name} не может чинить ${targetId}, ошибка ${errorCodeToText(errorCode)}`,
        creepCannotTransfer: (creep, targetId, errorCode) => `Крип ${creep.name} не может отдавать в ${targetId}, ошибка ${errorCodeToText(errorCode)}`,
        creepCannotUpgradeController: (creep, targetId, errorCode) => `Крип ${creep.name} не может улучать контроллер ${targetId}, ошибка ${errorCodeToText(errorCode)}`,
        creepCannotWithdraw: (creep, targetId, errorCode) => `Крип ${creep.name} не может забирать из ${targetId}, ошибка ${errorCodeToText(errorCode)}`,
    },
}

module.exports = staticStrings;