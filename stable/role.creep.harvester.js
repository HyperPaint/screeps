module.exports = {

    /** @param {Creep} creep **/
    process: function(creep) {
        // Если есть свободное место
	    if(creep.store.getFreeCapacity() > 0) {
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
        // Если свободного места нет
        else {
            // Найти место для складывания
            let targets = creep.room.find(FIND_STRUCTURES, {
                    // Спавн, расширение
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                // Найти ближний
                let target = creep.pos.findClosestByPath(targets);
                // Складывать
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
	}

};