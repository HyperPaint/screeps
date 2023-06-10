# Screeps

Моя колония живёт по этим правилам.

## Классы крипов
Добытчик (Harvester):
- Добывает энергию
- Относит её на спавн или его расширения или в ближайший контейнер

Улучшатель (Upgrader):
- Добывает или забирает энергию с контейнеров
- Улучшает контроллер в комнате

Строитель (Builder):
- Добывает или забирает энергию с контейнеров
- Строит по чертежам в комнате
- Поддерживает строения в комнате
- При отсутствии работы не мешает

Ассистент (Assistant):
- Забирает энергию с контейнеров
- Относит её на спавн или его расширения
- Делит энергию поровну между контейнерами
- При отсутствии работы собирает энергию с пола и прочих мест и относит её в контейнер

Бурильщик (Driller):
- **Работает в паре с ассистентом**
- Добывает энергию
- Складывает её только в ближайший контейнер
- Респавнится заранее

Защитник (Protector-M[elee] / Protector-R[ange])
- Атакует противников
- При отсутствии работы не мешает

Нападающий (Attacker-M[elee] / Attacker-R[ange])
- Атакует противников и их здания в другой комнате

## Эпохи
Каждый уровень развития это конкретная эпоха. Комната живёт по правилам конкретно этой эпохи.
### Нулевая
Условия:
- Первый уровень контроллера
- Отсутствие любых зданий или чертежей

Крипы:
- Добытчик 1
- Улучшатель 2

### Первая
Условия:
- Первый уровень контроллера
- Наличие любых зданий, требующих починки или чертежей

Крипы:
- Добытчик 1
- Улучшатель 2
- Строитель 1

### Вторая
Условия:
- Второй уровень контроллера
- Наличие любых зданий, требующих починки или чертежей

## Подсказки
### Создать крипа
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1' );
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester2' );
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader1' );
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1', { memory: { role: 'builder' } } );
Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], 'HarvesterBig', { memory: { role: 'harvester' } } );

### Убить крипа
Game.creeps['Harvester1'].suicide()

### Записать в память
Game.creeps['Harvester1'].memory.role = 'harvester';
Game.creeps['Upgrader1'].memory.role = 'upgrader';

### Активировать безопасный режим
Game.spawns['Spawn1'].room.controller.activateSafeMode();

### Разместить постройку
Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
