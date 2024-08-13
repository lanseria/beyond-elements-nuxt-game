import { nanoid } from 'nanoid'
import BigNumber from 'bignumber.js'
import { bosses, characters } from './const'
// 定义角色属性的接口
export interface CharacterProps {
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
export class Character {
  public id: string
  public props: CharacterProps
  public currentState: CharacterProps

  imageUrl: string

  // 构造函数用于创建角色实例
  constructor(props: CharacterProps, imageUrl: string) {
    this.id = nanoid()
    this.props = props
    this.currentState = { ...props } // 将 props 的值复制给 currentState
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
  const characterObjects = useLocalStorage<Character[]>('characterObjects', [])
  const bossObjects = useLocalStorage<Character[]>('bossObjects', [])

  function initCharacter(force = false) {
    if (force || characterObjects.value.length === 0) {
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
  }
  function initBoss(force = false) {
    if (force || bossObjects.value.length === 0) {
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
  }
  /**
   * 角色受到攻击
   * @param id 角色ID
   * @param attack 攻击力
   */
  function receiveAttack(id: string, value: number) {
    const allCharacter = [...characterObjects.value, ...bossObjects.value]
    const characterIdx = allCharacter.findIndex(character => character.id === id)
    if (characterIdx === -1) {
      throw new Error('未找到角色')
    }
    const character = allCharacter[characterIdx]

    // 假设 attack 和 character.currentState.defense 是 number 类型
    const attack = new BigNumber(value)
    const defense = new BigNumber(character.currentState.defense)

    // 计算伤害
    let damage = attack.minus(defense)

    // 计算最低伤害，确保伤害不低于攻击力的5%
    const minDamage = attack.multipliedBy(0.05)

    // 如果伤害低于最低伤害，将其设为最低伤害
    if (damage.isLessThan(minDamage)) {
      damage = minDamage
    }

    // 将计算后的伤害从角色的当前生命值中减去
    // 首先判断角色是否已经死亡
    if (character.currentState.health <= 0) {
      throw new Error('角色已经死亡')
    }
    // 计算伤害后，更新角色的当前生命值
    const remainingHealth = new BigNumber(character.currentState.health).minus(damage)

    // 如果剩余生命值小于 0，将其设置为 0，否则保留计算后的值
    character.currentState.health = remainingHealth.isLessThan(0) ? 0 : +remainingHealth.toFixed(0)
  }
  return {
    characterObjects,
    bossObjects,

    initCharacter,
    initBoss,
    receiveAttack,
  }
}
