import { CreateCreepType } from "types/CreepType";
import { generateRandomHex } from "./tools";

export function createCreep(spawn: StructureSpawn, createCreep: CreateCreepType) {
  const creep = spawn.spawnCreep(createCreep.body, `${generateRandomHex()}[${createCreep.role}]`, {
    memory: {
      role: createCreep.role,
      room: spawn.room.name,
      working: false
    }
  });
}
