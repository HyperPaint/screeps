const staticErrors = require("./static.errors");

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
        notRealized: (object, targetId, errorCode = 0) => `Объект ${object.id} не может работать с объектом ${targetId}, функция не реализована, ошибка ${staticErrors.errorCodeToText(errorCode)}`,

        creepCannotAttack: (creep, targetId, errorCode) => `Крип ${creep.name} не может атаковать цель ${targetId}, ошибка ${staticErrors.errorCodeToText(errorCode)}`,
        creepCannotBuild: (creep, targetId, errorCode) => `Крип ${creep.name} не может строить объект ${targetId}, ошибка ${staticErrors.errorCodeToText(errorCode)}`,
        creepCannotClaimController: (creep, targetId, errorCode) => `Крип ${creep.name} не может захватить контроллер ${targetId}, ошибка ${staticErrors.errorCodeToText(errorCode)}`,
        creepCannotDismatle: (creep, targetId, errorCode) => `Крип ${creep.name} не может разбирать объект ${targetId}, ошибка ${staticErrors.errorCodeToText(errorCode)}`,
        creepCannotGenerateSafeMode: (creep, targetId, errorCode) => `Крип ${creep.name} не может создать безопасный режим в контроллере ${targetId}, ошибка ${staticErrors.errorCodeToText(errorCode)}`,
        creepCannotHarvest: (creep, targetId, errorCode) => `Крип ${creep.name} не может добывать ${targetId}, ошибка ${staticErrors.errorCodeToText(errorCode)}`,
        creepCannotHeal: (creep, targetId, errorCode) => `Крип ${creep.name} не может лечить ${targetId}, ошибка ${staticErrors.errorCodeToText(errorCode)}`,
        creepCannotPickup: (creep, targetId, errorCode) => `Крип ${creep.name} не может подбирать ${targetId}, ошибка ${staticErrors.errorCodeToText(errorCode)}`,
        creepCannotRepair: (creep, targetId, errorCode) => `Крип ${creep.name} не может чинить ${targetId}, ошибка ${staticErrors.errorCodeToText(errorCode)}`,
        creepCannotTransfer: (creep, targetId, errorCode) => `Крип ${creep.name} не может отдавать в ${targetId}, ошибка ${staticErrors.errorCodeToText(errorCode)}`,
        creepCannotUpgradeController: (creep, targetId, errorCode) => `Крип ${creep.name} не может улучать контроллер ${targetId}, ошибка ${staticErrors.errorCodeToText(errorCode)}`,
        creepCannotWithdraw: (creep, targetId, errorCode) => `Крип ${creep.name} не может забирать из ${targetId}, ошибка ${staticErrors.errorCodeToText(errorCode)}`,
    },
}

module.exports = staticStrings;