import { CreateCreepType } from "types/CreepType";
import TaskType from "types/TaskType";
import Builder from "classes/creeps/builder";
import { filter } from "lodash";
export const role: string = "miniMiner";
export const body: CreateCreepType["body"] = [WORK, CARRY, CARRY, MOVE, MOVE];

export const act: CreateCreepType["act"] = (task) => {
  /**
   * 升级
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
  } else if (task === TaskType.BUILD) {
    return Builder.act(TaskType.BUILD)
  } else if (task === TaskType.TRANSFER) {
    console.log('准备转移到容器');
    return (creep) => {
      const structures = Game.rooms[creep.memory.room].find(FIND_STRUCTURES);
      const containers = structures.filter(structure => structure.structureType === STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY));
      if (containers.length > 0) {
        const container = creep.pos.findClosestByPath(containers);
        if (!container) return;
        if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      }
    }
  }
  /**
   * 采集并且放回Spawn
   */
  return (creep: Creep) => {
    // 检测如果背包慢了，移动到总部
    // 如果工作范围内没有能源点，移动到能源点
    // 采集能源
    const source = creep.pos.findClosestByPath(FIND_SOURCES);
    const spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
    const capacity = creep.store.getFreeCapacity(RESOURCE_ENERGY)
    if (capacity === null || capacity > 0) {
      if (!source) return;
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    } else {
      if (!spawn) return;
      if (spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(spawn, { visualizePathStyle: { stroke: '#ff0000' } });
        }
      } else {
        const sites = Game.rooms[creep.memory.room].find(FIND_CONSTRUCTION_SITES);
        const structures = Game.rooms[creep.memory.room].find(FIND_STRUCTURES);
        const containers = structures.filter(structure => structure.structureType === STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
        console.log('containers', containers);
        if (containers.length > 0) {
          creep.memory.task = TaskType.TRANSFER;
        } else if (sites.length > 0) {
          creep.memory.task = TaskType.BUILD;
          return;
        }
        creep.memory.task = TaskType.ENERGY2CONTROLLER
      }
    }
  }
}

export default {
  role,
  body,
  act
}
