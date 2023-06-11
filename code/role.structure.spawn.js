const otherConstants = require("./other.constants");
const otherConstantsErrors = require("./other.constants.errors");
const otherConstantsStrings = require("./other.constants.strings");
const roleCreepBuilder = require("./role.creep.builder");
const roleCreepHarvester = require("./role.creep.harvester");
const roleCreepUpgrader = require("./role.creep.upgrader");
const roleStaticEpoch = require("./role.static.epoch");

const roleStructureSpawn = {
    /**
     * Функция для работы процессов спавнов.
     * Должна вызываться каждый тик.
     * @param {StructureSpawn} spawn Спавн, в котором необходимо вызвать работу процессов.
     */
    process: function(spawn) {
        if (spawn.spawning) {
            // Если спавн работает, отобразить текст работы
            let creep = spawn.spawning;
            spawn.room.visual.text("🛠️" + creep.name + "🛠️", spawn.pos.x, spawn.pos.y + 1.5);
        } else {
            // Иначе попытаться поставить в очередь задачи
            let currentEpoch = roleStaticEpoch.getEpoch(spawn.room), roleCreepName;

            // Добытчик
            if (!this.checkCreeps(otherConstants.roleNames.harvester, currentEpoch.creepsCounts.harvester)) {
                roleCreepName = otherConstants.roleCreepNames.harvester();
                if (this.checkSpawn(spawn, currentEpoch.creepsBodies.harvester, roleCreepName)) {
                    this.spawn(spawn, currentEpoch.creepsBodies.harvester, roleCreepName, roleCreepHarvester.initialMemory(spawn));
                    return;
                }
            }

            // Улучшатель
            if (!this.checkCreeps(otherConstants.roleNames.upgrader, currentEpoch.creepsCounts.upgrader)) {
                roleCreepName = otherConstants.roleCreepNames.upgrader();
                if (this.checkSpawn(spawn, currentEpoch.creepsBodies.upgrader, roleCreepName)) {
                    this.spawn(spawn, currentEpoch.creepsBodies.upgrader, roleCreepName, roleCreepUpgrader.initialMemory(spawn));
                    return;
                }
            }

            // Строитель
            if (!this.checkCreeps(otherConstants.roleNames.builder, currentEpoch.creepsCounts.builder)) {
                roleCreepName = otherConstants.roleCreepNames.builder();
                if (this.checkSpawn(spawn, currentEpoch.creepsBodies.builder, roleCreepName)) {
                    this.spawn(spawn, currentEpoch.creepsBodies.builder, roleCreepName, roleCreepBuilder.initialMemory(spawn));
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

            case -6:
                return false;

            default:
                console.log("Проверка возможности создания крипа " + creepName + " не пройдена, код ошибки " + otherConstantsErrors.errorCodeToText(result));
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
                console.log("Создание крипа " + creepName + " запущено неуспешно, код ошибки " + otherConstantsErrors.errorCodeToText(result));
                break;
        }
    },

    /**
     * Очистка несуществующей памяти крипов.
     * Очищает память крипов, которые погибли по любым причинам.
     */
    clearNonExistingCreepMemory: function() {
        console.log("Начата очистка несуществующей памяти крипов");
        for (let creepName in Memory.creeps) {
            if (!Game.creeps[creepName]) {
                console.log("Очистка несуществующей памяти крипов: " + creepName);
                delete Memory.creeps[creepName];
            }
        }
        console.log("Закончена очистка несуществующей памяти крипов");
    },
};

module.exports = roleStructureSpawn;