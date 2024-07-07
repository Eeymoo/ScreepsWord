import { CreateCreepType } from "types/CreepType"; // 假设这个类型定义了body和act的接口

// 定义角色名称
export const role: string = "controllerUpgrader";

// 定义creep的身体部件
export const body: CreateCreepType["body"] = [WORK, CARRY, MOVE, MOVE]; // 假设需要更多的WORK来加速升级过程

// 定义角色的行为
export const act: CreateCreepType["act"] = (task) => {
  return (creep: Creep) => {
    // 查找最近的控制器
    const controller = creep.room.controller;
    if (!controller) {
      creep.say('No controller found!');
      return;
    }

    // 检查控制器是否需要升级
    if (controller.level < 8) {
      // 检查creep是否携带足够的能量
      if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
        // 如果没有能量，则寻找能量源
        const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE); // 使用FIND_SOURCES_ACTIVE来找到当前有产量的能源
        if (source) {
          if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
          }
        }
      } else {
        // 如果有能量，则尝试升级控制器
        if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
          creep.moveTo(controller, { visualizePathStyle: { stroke: '#00ff00' } });
        }
      }
    } else {
      // 如果控制器已经是最高级，可以考虑执行其他任务，比如寻找能量源以维持能量储备
      // 这里可以添加其他逻辑...
      creep.say('Controller at max level!');
    }
  };
}

// 导出角色定义
export default {
  role,
  body,
  act
};
