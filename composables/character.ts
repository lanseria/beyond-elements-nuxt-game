export class Character {
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

  // 构造函数用于创建角色实例
  constructor(name: string, health: number, attack: number, defense: number, critRate: number, critDamage: number, toughness: number, protection: number, damageIncrease: number, damageReduction: number) {
    this.name = name
    this.health = health
    this.attack = attack
    this.defense = defense
    this.critRate = critRate
    this.critDamage = critDamage
    this.toughness = toughness
    this.protection = protection
    this.damageIncrease = damageIncrease
    this.damageReduction = damageReduction
  }
}

export function useCharacter() {
  return {
    Character,
  }
}
