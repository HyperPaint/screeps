let config = require('_config');
let room_ = require('_room');

let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleRepairer = require('role.repairer');
let roleSecurityMelee = require('role.security_melee');
let roleSecurityRange = require('role.security_range');
let roleSoldierMelee = require('role.soldier_melee');
let roleSoldierRange = require('role.soldier_range');

let buildingTower = require('building.tower');

module.exports.loop = function() {
    room_.spawn();

    let towers;
    let room;
    for (let roomName in Game.rooms) {
        room = Game.rooms[roomName];
        towers = room.find(FIND_MY_STRUCTURES, {
            filter: object => object.structureType == STRUCTURE_TOWER
        });
        for (let tower in towers) {
            buildingTower.run(towers[tower]);
        }
    }

    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        switch (creep.memory.role) {
            case config.roles.harvester:
                roleHarvester.run(creep);
                break;
            
            case config.roles.upgrader:
                roleUpgrader.run(creep);
                break;
                
            case config.roles.builder:
                roleBuilder.run(creep);
                break;
				
			case config.roles.repairer:
                roleRepairer.run(creep);
                break;
				
            case config.roles.security_melee:
                roleSecurityMelee.run(creep);
                break;

            case config.roles.security_range:
                roleSecurityRange.run(creep);
                break;

            case config.roles.soldier_melee:
                roleSoldierMelee.run(creep);
                break;

            case config.roles.soldier_range:
                roleSoldierRange.run(creep);
                break;
        }
    }
}