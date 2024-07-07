import { CreateCreepType } from "types/CreepType";
import TaskType from "types/TaskType";

export const role: string = "porter";
export const body: CreateCreepType["body"] = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];

export const act: CreateCreepType["act"] = (task) => {
  /**
   * 转移到 控制器
   */
  if (task === TaskType.ENERGY2CONTROLLER) {
    return (creep: Creep) => {
      // creep.say('Go Upgrade.');
      const room = Game.rooms[creep.memory.room];
      if (!room.controller) return;
      const upgrade = creep.upgradeController(room.controller);
      if (upgrade === ERR_NOT_IN_RANGE) {
        creep.moveTo(room.controller, { visualizePathStyle: { stroke: '#ff0000' } })
      } else if (upgrade === ERR_NOT_ENOUGH_RESOURCES) {
        creep.memory.task = TaskType.DEFAULT;
      }
    }
  }
  /**
   * 采集并且放回Spawn
   */
  return (creep: Creep) => {
    const room = Game.rooms[creep.memory.room];
    const resources = room.find(FIND_DROPPED_RESOURCES);
    const resourceEnergy = creep.pos.findClosestByPath(
      resources.filter(resource => resource.resourceType === RESOURCE_ENERGY)
    );
    const capacity = creep.store.getFreeCapacity(RESOURCE_ENERGY)
    if (resources.length !==0 || capacity > 0) {
      if (!resourceEnergy) return;
      if (creep.pickup(resourceEnergy) === ERR_NOT_IN_RANGE) {
        creep.moveTo(resourceEnergy)
      }
    } else {
      creep.memory.task = TaskType.ENERGY2CONTROLLER;
    }
  }
}

export default {
  role,
  body,
  act
}
