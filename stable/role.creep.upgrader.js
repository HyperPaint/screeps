module.exports = {

    /** @param {Creep} creep **/
    process: function(creep) {
        
        // Если текущая задача улучшать и нет ресурсов
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
	    }
        // Если текущая задача добывать и есть ресурсы
	    else if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	    }

        // Если текущая задача улучшать
	    if(creep.memory.upgrading) {
            // Улучшить контроллер
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        // Если текущая задача добывать
        else {
            // Найти источники энергии
            let sources = creep.room.find(FIND_SOURCES);
            if (sources.length > 0) {
                // Найти ближний
                let source = creep.pos.findClosestByPath(sources);
                // Добывать
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
	}
};