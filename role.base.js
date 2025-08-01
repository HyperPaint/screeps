let roleBase = {
    /**
     * Добыть энергию
     * @param {Creep} creep
     * @returns Ноль если действие не требуется, положительное число если действие применено, отрицательное число если действие не применено
     */
    harvest: function(creep) {
        if (creep.memory.isHarvesting) {
            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.isHarvesting = false;
                creep.say("👷")

                return 0;
            } else {
                return roleBase.__harvest__(creep);
            }
        } else {
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.isHarvesting = true;
                creep.say("👷")
                
                return roleBase.__harvest__(creep);
            } else {
                return 0;
            }
        }
    },

    __harvest__: function(creep) {
        if (roleBase.__loot__(creep, RESOURCE_ENERGY, 1) == 0) {
            let source;

            if (creep.memory.source != null) {
                source = Game.getObjectById(creep.memory.source);
                if (source.energy == 0) {
                    source = null;
                }
            }

            if (source == null) {
                let sources = creep.room.find(FIND_SOURCES_ACTIVE);
                if (sources.length > 0) {
                    source = _.sample(sources);
                    creep.memory.source = source.id;
                }
            }
            
            if (source == null) {
                console.log("Can't find source, creep=" + creep.name + " source=" + source);
                creep.say("🔴");

                return -1;
            }

            let result = creep.harvest(source);
            if (result == OK) {
                return 1;
            }
            
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: "#ffff00", lineStyle: "dotted" } } );

                return 1;
            } else {
                console.log("Can't harvest source, code=" + result + " creep=" + creep.name + " source=" + source);
                creep.say("🔴");

                return -1;
            }
        }
    },

    /**
     * Улучшить контроллер
     * @param {Creep} creep 
     * @returns Ноль если действие не требуется, положительное число если действие применено, отрицательное число если действие не применено
     */
    upgradeController: function(creep) {
        let result = creep.upgradeController(creep.room.controller);
        if (result == OK) {
            return 1;
        }

        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: "#ffff00", lineStyle: "dotted" } } );

            return 1;
        } else {
            console.log("Can't upgrade controller, code=" + result + " creep=" + creep.name + " controller=" + creep.room.controller);
            creep.say("🔴");

            return -1;
        }
    },

    /**
     * Подобрать энергию
     * @param {Creep} creep
     * @param {ResourceType} resourceType
     * @param {Number} range 
     * @returns Ноль если действие не требуется, положительное число если действие применено, отрицательное число если действие не применено
     */
    __loot__: function(creep, resourceType, range) {
        let drops = creep.pos.findInRange(FIND_DROPPED_RESOURCES, range,
            {
                filter: function (drop) {
                    return drop.resourceType == resourceType;
                }
            }
        );
        if (drops.length > 0) {
            let result = creep.pickup(drops[0]);
            if (result == OK) {
                return 1;
            }

            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(drops[0], { visualizePathStyle: { stroke: "#ffff00", lineStyle: "dotted" } } );

                return 1;
            } else {
                console.log("Can't pickup resource, code=" + result + " creep=" + creep.name + " drop=" + drops[0]);
                creep.say("🔴");

                return -1;
            }
        }

        let tombstones = creep.pos.findInRange(FIND_TOMBSTONES, range,
            {
                filter: function (tombstone) {
                    return tombstone.store[resourceType] > 0;
                }
            }
        );
        if (tombstones.length > 0) {
            let result = creep.withdraw(tombstones[0], resourceType);
            if (result == OK) {
                return 1;
            }

            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(tombstones[0], { visualizePathStyle: { stroke: "#ffff00", lineStyle: "dotted" } } );

                return 1;
            } else {
                console.log("Can't withdraw resource, code=" + result + " creep=" + creep.name + " tombstone=" + tombstones[0]);
                creep.say("🔴");

                return -1;
            }
        }

        return 0;
    },

    /**
     * Передать энергию
     * @param {Creep} creep
     * @param {ResourceType} resourceType
     * @param {StructureType} structureType
     * @returns Ноль если действие не требуется, положительное число если действие применено, отрицательное число если действие не применено
     */
    transferResource: function(creep, resourceType, structureType) {
        let structure = creep.pos.findClosestByRange(structureType,
            {
                filter: function (structure) {
                    return structure.store.getFreeCapacity(resourceType) > 0;
                }
            }
        );
        if (structure == null) {
            return 0;
        }

        let result = creep.transfer(structure, resourceType);
        if (result == OK) {
            return 1;
        }

        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(structure, { visualizePathStyle: { stroke: "#ffff00", lineStyle: "dotted" } } );

            return 1;
        } else {
            console.log("Can't transfer resource, code=" + result + " creep=" + creep.name + " resourceType=" + resourceType + " structureType=" + structureType + " structure=" + structure);
            creep.say("🔴");

            return -1;
        }
    }
};

module.exports = roleBase;
