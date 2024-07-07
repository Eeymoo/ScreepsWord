import { CreateCreepType } from "types/CreepType";
import TaskType from "types/TaskType";

export const role: CreateCreepType['role'] = 'builder';
export const body: CreateCreepType['body'] = [WORK, CARRY, CARRY, MOVE, MOVE];
export const act: CreateCreepType['act'] = (task) => {
  if (task === TaskType.BUILD) {
    return (creep) => {
      const sites = Game.rooms[creep.memory.room].find(FIND_CONSTRUCTION_SITES);
      if (sites.length > 0) {
        const site = creep.pos.findClosestByPath(sites);
        if (!site) return;
        const build = creep.build(site);
        if (build === ERR_NOT_IN_RANGE) {
          creep.moveTo(site, { visualizePathStyle: { stroke: '#749172' } });
        } else if (build === ERR_NOT_ENOUGH_ENERGY) {
          creep.memory.task = TaskType.MINE
        }
      }
    }
  } else if (task === TaskType.MINE) {
    return (creep) => {
      const source = creep.pos.findClosestByPath(FIND_SOURCES);
      const capacity = creep.store.getFreeCapacity(RESOURCE_ENERGY);
      if (capacity === null || capacity > 0) {
        if (!source) return;
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      } else {
          creep.memory.task = TaskType.BUILD;
      }
    }
  }
  return (creep: Creep) => {
    const room = Game.rooms[creep.memory.room];
    creep.memory.task = TaskType.BUILD;
  }
}

export default {
  role,
  body,
  act
}
