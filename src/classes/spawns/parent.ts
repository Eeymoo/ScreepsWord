import { CreateSpawnType } from "types/SpawnType";
import { createCreep } from "utils/create";
import { calculateCreepCost } from "utils/tools";
import Builder from "classes/creeps/builder";
import MiniMiner from "classes/creeps/miniMiner";

export const role: CreateSpawnType['role'] = 'parent';

export const act: CreateSpawnType['act'] = (task) => {
  return (spawn: StructureSpawn) => {
    if (spawn.store.energy >= calculateCreepCost(MiniMiner.body)) {
      const { creeps } = Game;
      const creepsInRooms = _.filter(creeps, (creeps) => {
        return creeps.memory.room === spawn.room.name && creeps.memory.role === MiniMiner.role
      });
      if (creepsInRooms.length < 6) {
        createCreep(spawn, MiniMiner);
      }
    }
    if (spawn.store.energy >= calculateCreepCost(Builder.body)) {
      const { creeps } = Game;
      if (spawn.room.controller && spawn.room.controller.level >= 2) {
        const creepsInRooms = _.filter(creeps, (creeps) => {
          return creeps.memory.room === spawn.room.name && creeps.memory.role === Builder.role
        });
        if (creepsInRooms.length < 2) {
          createCreep(spawn, Builder);
        }
      }
    }
    return OK;
  }
};

export default {
  role,
  act
}
