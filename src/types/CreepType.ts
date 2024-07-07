import { CreepActionCreator } from "types/ActType";
import { BODY_PART_COST } from "utils/tools";

export type CreateCreepType = {
  role: string,
  act: CreepActionCreator,
  body: Array<keyof typeof BODY_PART_COST>
}
