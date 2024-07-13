import { CreateSpawnType } from "types/SpawnType";
import { createCreep } from "utils/create";
import { calculateCreepCost } from "utils/tools";
import builder from "classes/creeps/builder";
import miniMiner from "classes/creeps/miniMiner";
import porter from "classes/creeps/porter";

export const role: CreateSpawnType['role'] = 'parent';

export const act: CreateSpawnType['act'] = (task) => {
  return (spawn: StructureSpawn) => {
    if (spawn.store.energy >= calculateCreepCost(miniMiner.body)) {
      const { creeps } = Game;
      const creepsInRooms = _.filter(creeps, (creeps) => {
        return creeps.memory.room === spawn.room.name && creeps.memory.role === miniMiner.role
      });
      if (creepsInRooms.length < 6) {
        createCreep(spawn, miniMiner);
      }
    }
    if (spawn.store.energy >= calculateCreepCost(builder.body)) {
      const { creeps } = Game;
      if (spawn.room.controller && spawn.room.controller.level >= 2) {
        const creepsInRooms = _.filter(creeps, (creeps) => {
          return creeps.memory.room === spawn.room.name && creeps.memory.role === builder.role
        });
        if (creepsInRooms.length < 2) {
          createCreep(spawn, builder);
        }
      }
    }
    let storages = spawn.room.find(FIND_STRUCTURES);
    storages = storages.filter(storage => storage.structureType === STRUCTURE_STORAGE && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0);

    if (storages.length > 0 && spawn.store.energy >= calculateCreepCost(porter.body)) {
      createCreep(spawn, porter);
    }
    return OK;
  }
};

export default {
  role,
  act
}
