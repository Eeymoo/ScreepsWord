import { CreepActionCreator } from "types/ActType";
import miniMiner from "classes/creeps/miniMiner";
import controllerUpgrader from "classes/creeps/controllerUpgrader";
import builder from "classes/creeps/builder";
import porter from "classes/creeps/porter";
export const creepActMap: { [key: string]: CreepActionCreator}= {
  [miniMiner.role]: miniMiner.act,
  [controllerUpgrader.role]: controllerUpgrader.act,
  [porter.role]: porter.act,
  [builder.role]: builder.act,

}
