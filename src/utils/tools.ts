export function length(obj:Object) {
  return Object.keys(obj).length;
}
export const BODY_PART_COST = {
    [MOVE]: 50,
    [WORK]: 100,
    [CARRY]: 50,
    [ATTACK]: 80,
    [HEAL]: 200,
    [RANGED_ATTACK]: 150,
    [TOUGH]: 10,
    [CLAIM]: 600
};
export function calculateCreepCost(body:Array<keyof typeof BODY_PART_COST>) {
    let totalCost = 0;
    for (let part of body) {
        totalCost += BODY_PART_COST[part];
    }
    return totalCost;
}
export function generateRandomHex(length = 4) {
  let result = '0x'; // 加上前缀'0x'
  for (let i = 0; i < length; i++) {
      // 生成一个0-15的随机数
      let randomNum = Math.floor(Math.random() * 16);
      // 将其转换为对应的十六进制字符
      result += randomNum.toString(16).toUpperCase();
  }
  return result;
}
