import { bosses, characters } from './const'

export class Character {
  public props: {
    /**
     * 角色名字
     */
    name: string
    /**
     * 角色生命值
     */
    health: number
    /**
     * 角色攻击
     */
    attack: number
    /**
     * 角色防御
     */
    defense: number
    /**
     * 角色暴击率
     */
    critRate: number
    /**
     * 角色暴击伤害
     */
    critDamage: number
    /**
     * 角色韧性
     */
    toughness: number
    /**
     * 角色保护
     */
    protection: number
    /**
     * 角色增伤
     */
    damageIncrease: number
    /**
     * 角色减伤
     */
    damageReduction: number
  }

  imageUrl: string

  // 构造函数用于创建角色实例
  constructor(props: { name: string, health: number, attack: number, defense: number, critRate: number, critDamage: number, toughness: number, protection: number, damageIncrease: number, damageReduction: number }, imageUrl: string) {
    this.props = props
    this.imageUrl = imageUrl
  }
}

// 用来根据基本属性值上下浮动生成随机数的函数
function getRandomValue(base: number, variation: number): number {
  const min = base - variation
  const max = base + variation
  return +(Math.random() * (max - min) + min).toFixed(0)
}

export function useCharacter() {
  const characterObjects = ref<Character[]>([])
  const bossObjects = ref<Character[]>([])
  function initCharacter() {
    characterObjects.value = characters.map(character => new Character({
      name: character.name,
      health: getRandomValue(character.health, 500), // 生命值上下浮动 500
      attack: getRandomValue(character.attack, 50), // 攻击力上下浮动 50
      defense: getRandomValue(character.defense, 30), // 防御力上下浮动 30
      critRate: getRandomValue(character.critRate, 0.1), // 暴击率上下浮动 0.1
      critDamage: getRandomValue(character.critDamage, 0.1), // 暴击伤害上下浮动 0.1
      toughness: getRandomValue(character.toughness, 0.1), // 韧性上下浮动 0.1
      protection: getRandomValue(character.protection, 10), // 保护上下浮动 10
      damageIncrease: getRandomValue(character.damageIncrease, 5), // 增伤上下浮动 5
      damageReduction: getRandomValue(character.damageReduction, 5), // 减伤上下浮动 5
    }, character.imageUrl))
  }
  function initBoss() {
    bossObjects.value = bosses.map(boss => new Character({
      name: boss.name,
      health: getRandomValue(boss.health, 500), // 生命值上下浮动 500
      attack: getRandomValue(boss.attack, 50), // 攻击力上下浮动 50
      defense: getRandomValue(boss.defense, 30), // 防御力上下浮动 30
      critRate: getRandomValue(boss.critRate, 0.1), // 暴击率上下浮动 0.1
      critDamage: getRandomValue(boss.critDamage, 0.1), // 暴击伤害上下浮动 0.1
      toughness: getRandomValue(boss.toughness, 0.1), // 韧性上下浮动 0.1
      protection: getRandomValue(boss.protection, 10), // 保护上下浮动 10
      damageIncrease: getRandomValue(boss.damageIncrease, 5), // 增伤上下浮动 5
      damageReduction: getRandomValue(boss.damageReduction, 5), // 减伤上下浮动 5
    }, boss.imageUrl))
  }
  return {
    characterObjects,
    bossObjects,

    initCharacter,
    initBoss,
  }
}
