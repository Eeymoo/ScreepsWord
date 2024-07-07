import Parent from "classes/spawns/parent";
import { SpawnActionCreator } from "types/ActType";
export const spawnActMap: { [key: string]: SpawnActionCreator}= {
  [Parent.role]: Parent.act,
}
