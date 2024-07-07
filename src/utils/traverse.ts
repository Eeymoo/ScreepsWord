import ParentSpawn from "classes/spawns/parent";
export const traverseCreeps = (creepAct:(creep:Creep) => void) => {
  const creeps = Game.creeps;
  for (const key in creeps) {
    if (Object.prototype.hasOwnProperty.call(creeps, key)) {
      const creep = creeps[key];
      creepAct(creep);
    }
  }
}

export const traverseRooms = () => {
  const rooms = Game.rooms;
  for (const key in rooms) {
    if (Object.prototype.hasOwnProperty.call(rooms, key)) {
      const room = rooms[key];
      // spawnAct(creep);
    }
  }
}

export const traverseSpawns = (spawnAct:(spawn: StructureSpawn) => void) => {
  const spawns = Game.spawns;
  const spawnKeys = Object.keys(spawns);
  if (spawnKeys.length === 1) {
    spawns[spawnKeys[0]].memory.role = ParentSpawn.role;
  }
  for (const key in spawns) {
    if (Object.prototype.hasOwnProperty.call(spawns, key)) {
      const spawn = spawns[key];
      spawnAct(spawn);
    }
  }
}
