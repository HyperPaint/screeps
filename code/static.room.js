const staticRoom = {
    memorySources: function(room) {
        // Память источников, если не создана
        if (room.memory.sources == undefined) {
            room.memory.sources = {};
        }
        // Память количества источников, если не создана
        if (room.memory.sources.count == undefined) {
            let sources = room.find(FIND_SOURCES);
            room.memory.sources.count = sources.length;
        }
        // Память идентификаторов источников, если не создана
        try {
            for (let index = 0; index < room.memory.sources.count; index++) {
                if (room.memory.sources[index.toString()] == undefined) {
                    throw 1;
                }
            }
        } catch {
            let sources = room.find(FIND_SOURCES);
            for (let index = 0; index < sources.length; index++) {
                room.memory.sources[index.toString()] = sources[index].id;
            }
        }
    }
}

module.exports = staticRoom;