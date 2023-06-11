const roleCreepBuilder = require("./role.creep.builder");
const roleCreepHarvester = require("./role.creep.harvester");
const roleCreepUpgrader = require("./role.creep.upgrader");
const otherConstants = require("./other.constants");

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
            if (!this.check(otherConstants.roleNames.harvester, this.getEpoch(spawn).creepCounts.harvester)) { // Добытчик
                this.spawn(spawn, this.getEpoch(spawn).creepBodies.harvester, otherConstants.roleCreepNames.harvester(), roleCreepHarvester.initialMemory(spawn));
            } else if (!this.check(otherConstants.roleNames.upgrader, this.getEpoch(spawn).creepCounts.upgrader)) { // Улучшатель
                this.spawn(spawn, this.getEpoch(spawn).creepBodies.upgrader, otherConstants.roleCreepNames.upgrader(), roleCreepUpgrader.initialMemory(spawn));
            } else if (!this.check(otherConstants.roleNames.builder, this.getEpoch(spawn).creepCounts.builder)) { // Строитель
                this.spawn(spawn, this.getEpoch(spawn).creepBodies.builder, otherConstants.roleCreepNames.builder(), roleCreepBuilder.initialMemory(spawn));
            }
        }
    },

    /**
     * Функция для вычисления уровня развития текущей комнаты.
     * Уровень развития вычисляется раз в несколько вызовов, обычно возвращается закэшированное значение.
     * @param {StructureSpawn} spawn Спавн в комнате которого трубуется вычислить уровень развития.
     * @return {Epoch} Возвращает объект эпохи соответствующий текущему развитию.
     */
    getEpoch: (spawn) => {
        return otherConstants.epochs[1];
    },

    /**
     * Функция проверяет соответствие текущему количества крипов заявленному количеству.
     * @param {String} role Роль крипов для проверки
     * @param {Number} count Заявленное количество крипов текущей роли
     * @return {Boolean} Возвращает true, если текущее количество больше или соответствует заявленному. Возвращает false, если это не так.
     */
    check: function(role, count) {
        let currentCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
        // Текущее количество меньше заявленного
        if (currentCreeps.length < count) {
            return false;
        } else {
            return true;
        }
    },

    /**
     * Функция создаёт крипа, если это возможно.
     * @param {StructureSpawn} spawn Спавн, в котором будет создан крип.
     * @param {Number[]} body Тело крипа.
     * @param {String} name Наименование крипа.
     * @param {Memory} memory Память крипа.
    **/
    spawn: function(spawn, body, name, memory) {
        let result = spawn.spawnCreep(body, name, { dryRun: true });
        if (result == OK) {
            console.log("Проверка возможности создания крипа " + name + " пройдена");
            this.clearNonExistingCreepMemory();
            if (spawn.spawnCreep(body, name, { memory: memory }) == OK) {
                console.log("Создание крипа " + name);
            }
        } else {
            switch (result) {
                // The operation has been scheduled successfully
                case OK:
                    console.log("Проверка возможности создания крипа " + name + " не пройдена, код ошибки OK");
                    break;

                // You are not the owner of this spawn
                case ERR_NOT_OWNER:
                    console.log("Проверка возможности создания крипа " + name + " не пройдена, код ошибки ERR_NOT_OWNER");
                    break;

                // There is a creep with the same name already
                case ERR_NAME_EXISTS:
                    console.log("Проверка возможности создания крипа " + name + " не пройдена, код ошибки ERR_NAME_EXISTS");
                    break;

                // The spawn is already in process of spawning another creep
                case ERR_BUSY:
                    console.log("Проверка возможности создания крипа " + name + " не пройдена, код ошибки ERR_BUSY");
                    break;

                // The spawn and its extensions contain not enough energy to create a creep with the given body
                case ERR_NOT_ENOUGH_ENERGY:
                    //console.log("Проверка возможности создания крипа " + name + " не пройдена, код ошибки ERR_NOT_ENOUGH_ENERGY");
                    break;

                // Body is not properly described or name was not provided
                case ERR_INVALID_ARGS:
                    console.log("Проверка возможности создания крипа " + name + " не пройдена, код ошибки ERR_INVALID_ARGS");
                    break;

                // Your Room Controller level is insufficient to use this spawn
                case ERR_RCL_NOT_ENOUGH:
                    console.log("Проверка возможности создания крипа " + name + " не пройдена, код ошибки ERR_RCL_NOT_ENOUGH");
                    break;

                default:
                    console.log("Проверка возможности создания крипа " + name + " не пройдена, код ошибки " + result);
                    break;
            }
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