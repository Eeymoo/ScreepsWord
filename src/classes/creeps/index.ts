import MiniMiner from "classes/creeps/miniMiner";
import ControllerUpgrader from "classes/creeps/controllerUpgrader";
import Porter from "classes/creeps/porter";
import Builder from "classes/creeps/builder";
import { CreepActionCreator } from "types/ActType";
export const creepActMap: { [key: string]: CreepActionCreator}= {
  [MiniMiner.role]: MiniMiner.act,
  [ControllerUpgrader.role]: ControllerUpgrader.act,
  [Porter.role]: Porter.act,
  [Builder.role]: Builder.act
}
