let config = {

	/*
	 * ���� �������
	 */
	roles: {
		// ��� ����
		none: 'none',
		// ��������
		harvester: 'harvester',
		harvesterBig: 'harvester_big',
		// ��������
		upgrader: 'upgrader',
		// ������
		builder: 'builder',
		// �����
		repairer: 'repairer',
		// �������� �� ����� ����������
		robber: 'robber',
		// ��������
		security_melee: 'security_melee',
		security_range: 'security_range',
		// �������
		soldier_melee: 'soldier_melee',
		soldier_range: 'soldier_range',
	},

	/*
	 * ������ �������
	 */
	level_1: {
		harvester_count: 1,
		harvester_big_count: 0,
		upgrader_count: 2,
		builder_count: 0,
		repairer_count: 0,
		robber_count: 0,
		security_melee_count: 0,
		security_range_count: 0,
		soldier_melee_count: 0,
		soldier_range_count: 0,
	},
	
	level_2: {
		harvester_count: 1,
		harvester_big_count: 0,
		upgrader_count: 2,
		builder_count: 1,
		repairer_count: 1,
		robber_count: 0,
		security_melee_count: 0,
		security_range_count: 0,
		soldier_melee_count: 0,
		soldier_range_count: 0,
	},
	
	level_3: {
		harvester_count: 1,
		harvester_big_count: 0,
		upgrader_count: 2,
		builder_count: 1,
		repairer_count: 1,
		robber_count: 0,
		security_melee_count: 0,
		security_range_count: 0,
		soldier_melee_count: 0,
		soldier_range_count: 0,
	},
	
	pathStyle: {
	    fill: undefined,
	    opacity: 0.5,
		stroke: '#ffffff',
		strokeWidth: 0.1,
		lineStyle: 'dotted',
	},
	
	pathStyleSpecial: {
	    fill: undefined,
	    opacity: 0.75,
		stroke: '#ff44ff',
		strokeWidth: 0.1,
		lineStyle: 'dotted',
	},

    get: function(room) {
	    switch(room.controller.level) {
			case 1:
				return this.level_1;
				
			case 2:
			    return this.level_2;
			    
		    case 3:
			    return this.level_3;
			
			default:
				return this.level_3;
		}
	},
};

module.exports = config;