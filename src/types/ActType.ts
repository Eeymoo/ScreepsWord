import TaskType from "./TaskType";

export type CreepActionCreator = (task?: TaskType) => (creep: Creep) => void;
export type SpawnActionCreator = (task?: TaskType) => (spawn: StructureSpawn) => void;
