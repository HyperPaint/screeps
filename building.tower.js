let buildingTower = {
	run: function (tower) {
		// ������
		if (tower.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
			let targets;
			// �����
			targets = tower.room.find(FIND_HOSTILE_CREEPS);
			if (targets.length) {
				if (tower.attack(targets[0])) {
					return;
                }
			}
			// �������
			targets = tower.room.find(FIND_STRUCTURES, {
				filter: object => {
					switch (object.structureType) {
						case STRUCTURE_WALL:
							return object.hits < 1000
						default:
							return object.hits < object.hitsMax
					}
				}
			});
			if (targets.length) {
				if (tower.repair(targets[0])) {
					return;
				}
			}
		}
	}
};

module.exports = buildingTower;