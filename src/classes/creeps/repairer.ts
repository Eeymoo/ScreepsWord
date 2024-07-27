import { CreateCreepType } from "types/CreepType";
import TaskType from "types/TaskType";

export const role: CreateCreepType["role"] = "porter";
export const body: CreateCreepType["body"] = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];

export const act: CreateCreepType["act"] = (task) => {
  switch (task) {
    case TaskType.REPAIR:
      return (creep) => {

        if (creep.repair() === ERR_NOT_IN_RANGE) {

        }
      }
    default:
      return (creep) => {

      }
  }
}

export default {
  role,
  body,
  act
}
