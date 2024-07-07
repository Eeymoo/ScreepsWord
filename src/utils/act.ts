import { creepActMap } from "classes/creeps";
import { spawnActMap } from "classes/spawns";


export const creepAct = (creep: Creep) => {
  const role = creep.memory.role;
  const task = creep.memory.task;
  const action = creepActMap[role];
  if (action) {
    action(task)(creep);
  }
}

export const spawnAct = (spawn: StructureSpawn) => {
  const role = spawn.memory.role;
  const task = spawn.memory.task;
  const action = spawnActMap[role];
  if (action) {
    action(task)(spawn);
  }
}
