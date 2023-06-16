const libVisual = require("./lib.visual");
const roleCreepBuilder = require("./role.creep.builder");
const roleCreepHarvester = require("./role.creep.harvester");
const roleCreepUpgrader = require("./role.creep.upgrader");
const staticConstants = require("./static.constants");
const staticEpoch = require("./static.epoch");
const staticErrors = require("./static.errors");

const roleStructureSpawn = {
    /**
     * Функция для работы процессов спавнов.
     * Должна вызываться каждый тик.
     * @param {StructureSpawn} spawn Спавн, в котором необходимо вызвать работу процессов.
     */
    process: function(spawn) {
        if (spawn.spawning) {
            // Если спавн работает, отобразить текст работы
            const creep = spawn.spawning;
            libVisual.setSpawnWorking(creep.name, spawn.room.visual, spawn.pos);
        } else {
            // Иначе попытаться поставить в очередь задачи
            let currentEpoch = staticEpoch.getEpoch(spawn.room), roleCreepName;

            // Добытчик
            if (!this.checkCreeps(staticConstants.roleNames.harvester, currentEpoch.creepsCounts.harvester)) {
                roleCreepName = staticConstants.roleCreepNames.harvester();
                if (this.checkSpawn(spawn, currentEpoch.creepsBodies.harvester, roleCreepName)) {
                    this.spawn(spawn, currentEpoch.creepsBodies.harvester, roleCreepName, roleCreepHarvester.getInitialMemory(spawn));
                    return;
                }
            }

            // Улучшатель
            if (!this.checkCreeps(staticConstants.roleNames.upgrader, currentEpoch.creepsCounts.upgrader)) {
                roleCreepName = staticConstants.roleCreepNames.upgrader();
                if (this.checkSpawn(spawn, currentEpoch.creepsBodies.upgrader, roleCreepName)) {
                    this.spawn(spawn, currentEpoch.creepsBodies.upgrader, roleCreepName, roleCreepUpgrader.getInitialMemory(spawn));
                    return;
                }
            }

            // Строитель
            if (!this.checkCreeps(staticConstants.roleNames.builder, currentEpoch.creepsCounts.builder)) {
                roleCreepName = staticConstants.roleCreepNames.builder();
                if (this.checkSpawn(spawn, currentEpoch.creepsBodies.builder, roleCreepName)) {
                    this.spawn(spawn, currentEpoch.creepsBodies.builder, roleCreepName, roleCreepBuilder.getInitialMemory(spawn));
                    return;
                }
            }
        }
    },

    /**
     * Функция проверяет соответствие текущему количества крипов заявленному количеству.
     * @param {String} role Роль крипов для проверки
     * @param {Number} creepsCount Заявленное количество крипов текущей роли
     * @return {Boolean} Возвращает true, если текущее количество больше или соответствует заявленному. Возвращает false, если это не так.
     */
    checkCreeps: function(role, creepsCount) {
        let currentCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
        // Текущее количество меньше заявленного
        if (currentCreeps.length < creepsCount) {
            return false;
        } else {
            return true;
        }
    },

    /**
     * Функция проверяет возможность создания крипа.
     * @param {StructureSpawn} spawn Спавн, в котором будет создан крип.
     * @param {Number[]} creepBody Тело крипа.
     * @param {String} creepName Наименование крипа.
     * @return {Boolean} Возвращает true, если спавн возможен. Возвращает false, если это не так.
     */
    checkSpawn: function(spawn, creepBody, creepName) {
        let result = spawn.spawnCreep(creepBody, creepName, { dryRun: true });
        switch (result) {
            case OK:
                console.log("Проверка возможности создания крипа " + creepName + " пройдена");
                return true;

            case ERR_NOT_ENOUGH_ENERGY:
                return false;

            default:
                console.log("Проверка возможности создания крипа " + creepName + " не пройдена, код ошибки " + staticErrors.errorCodeToText(result));
                return false;
        }
    },

    /**
     * Функция создаёт крипа, если это возможно.
     * @param {StructureSpawn} spawn Спавн, в котором будет создан крип.
     * @param {Number[]} creepBody Тело крипа.
     * @param {String} creepName Наименование крипа.
     * @param {Memory} creepMemory Память крипа.
    **/
    spawn: function(spawn, creepBody, creepName, creepMemory) {
        this.clearNonExistingCreepMemory();
        let result = spawn.spawnCreep(creepBody, creepName, { memory: creepMemory });
        switch (result) {
            case OK:
                console.log("Создание крипа " + creepName + " запущено успешно");
                break;

            default:
                console.log("Создание крипа " + creepName + " запущено неуспешно, код ошибки " + staticErrors.errorCodeToText(result));
                break;
        }
    },

    /**
     * Очистка несуществующей памяти крипов.
     * Очищает память крипов, которые погибли по любым причинам.
     */
    clearNonExistingCreepMemory: function() {
        for (let creepName in Memory.creeps) {
            if (!Game.creeps[creepName]) {
                console.log("Очистка несуществующей памяти крипов: " + creepName);
                delete Memory.creeps[creepName];
            }
        }
    },
};

module.exports = roleStructureSpawn;