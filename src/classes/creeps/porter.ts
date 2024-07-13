import { CreateCreepType } from "types/CreepType";
import TaskType from "types/TaskType";

export const role: CreateCreepType["role"] = "porter";
export const body: CreateCreepType["body"] = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];

export const act: CreateCreepType["act"] = (task) => {
  /**
   * 转移到 控制器
   */
  switch (task) {
    case TaskType.ENERGY2CONTROLLER:
      /**
       * 升级控制器
       */
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

    case TaskType.TRANSPORT:
      /**
       * 转移
       */
      return (creep: Creep) => {
        // creep.say('Go Transport.');
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
          creep.memory.task = TaskType.GATHER;
          return;
        }
        const room = Game.rooms[creep.memory.room];
        // 寻找 storage
        let storages = room.find(FIND_STRUCTURES);
        storages = storages.filter(storage => storage.structureType === STRUCTURE_STORAGE && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0);

        if (storages.length !== 0) {
          const storage = creep.pos.findClosestByPath(storages);
          if (!storage) return;
          if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(storage, { visualizePathStyle: { stroke: '#ff0000' } })
          }
        }
      }

    case TaskType.GATHER:
      /**
       * 采集
       */
      return (creep: Creep) => {
        // 搜索全部地图的散落资源
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY)===0) {
          creep.memory.task = TaskType.TRANSPORT;
        }
        const room = Game.rooms[creep.memory.room];
        const resources = room.find(FIND_DROPPED_RESOURCES);
        if (resources.length !== 0) {
          const resourceEnergy = creep.pos.findClosestByPath(
            resources.filter(resource => resource.resourceType === RESOURCE_ENERGY)
          );
          if (!resourceEnergy) return;
          if (creep.pickup(resourceEnergy) === ERR_NOT_IN_RANGE) {
            creep.moveTo(resourceEnergy)
          }
        }
      }

    default:
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
}

export default {
  role,
  body,
  act
}
