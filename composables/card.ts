import { nanoid } from 'nanoid'
import BigNumber from 'bignumber.js'
import { characters } from './const'

type CardType = 'attack' | 'defense' | 'critRate' | 'critDamage' | 'toughness' | 'protection' | 'damageIncrease' | 'damageReduction'

export class Card {
  public id: string
  public type: CardType
  public owner: string
  public locked: boolean

  constructor(type: CardType, owner: string) {
    this.id = nanoid()
    this.type = type
    this.owner = owner
    this.locked = false
  }
}

// 从每个角色的属性生成一个卡片池
function generateCardPool() {
  let cardPool: Card[] = []

  characters.forEach((character) => {
    cardPool = cardPool.concat([
      new Card('attack', character.name),
      new Card('attack', character.name),
      new Card('attack', character.name),
      new Card('attack', character.name),
      new Card('attack', character.name),
      new Card('attack', character.name),
      new Card('attack', character.name),
      new Card('attack', character.name),
    ])
  })

  return cardPool
}

export function useCard() {
  const {
    bossObjects,
    characterObjects,

    initCharacter,
    initBoss,
  }
  = useCharacter()

  const isAttack = ref(false)
  const isAutoAttack = ref(false)
  const duration = ref(200)
  const isGameOver = ref(false)
  //
  const attackCanvas = shallowRef<HTMLCanvasElement>()
  // 卡片池
  const cardPool = useLocalStorage<Card[]>('cardPool', [])
  // 手牌
  const handCards = useLocalStorage<Card[]>('handCards', [])
  // 发动牌库
  const dropCards = useLocalStorage<Card[]>('dropCards', [])

  function initGame() {
    isGameOver.value = false
    initCharacter(true)
    initBoss(true)
    initStartCards()
  }
  // 一次生成32张卡片去卡片池
  function initCardPool() {
    cardPool.value = generateCardPool()
  }

  // 随机从卡片池中选择8张卡片
  function pushHandCardsFromCardPool(count: number = 8) {
    // console.log('pushHandCardsFromCardPool', count)
    const selectedCards: Card[] = []

    // 过滤掉已锁定的卡片
    const unlockedCardPool = cardPool.value.filter(card => !card.locked)
    while (selectedCards.length < count) {
      const randomIndex = Math.floor(Math.random() * unlockedCardPool.length)
      selectedCards.push(unlockedCardPool[randomIndex])
      // if (!unlockedCardPool[randomIndex]) {
      //   console.log(randomIndex, unlockedCardPool, cardPool.value)
      // }
      // console.log('selectedCards', unlockedCardPool[randomIndex])
      // 将卡片从卡片池中移除
      const indexToRemove = cardPool.value.findIndex(card => card.id === unlockedCardPool[randomIndex].id)
      if (indexToRemove !== -1) {
        cardPool.value.splice(indexToRemove, 1)
      }
    }

    handCards.value.push(...selectedCards)
  }

  // 初始化
  function initStartCards() {
    // 初始化卡片池
    initCardPool()
    // 清空手牌
    handCards.value = []
    // 随机从卡片池中选择8张卡片
    pushHandCardsFromCardPool()
    // 初始化发动牌库
    dropCards.value = []
  }
  function handleClickHandCard(card: Card) {
    if (isAttack.value || isAutoAttack.value) {
      return
    }
    drawCardToDrop(card)
  }
  // 从手牌中拿出一张卡片到发动牌库
  function drawCardToDrop(card: Card) {
    // 先判断发动牌库是否已满
    if (dropCards.value.length >= maxDropCards) {
      Message.warning('发动牌库已满，无法继续')
      return
    }
    handCards.value.splice(handCards.value.indexOf(card), 1)
    dropCards.value.push(card)
  }
  function handleClickDropCard(card: Card) {
    if (isAttack.value || isAutoAttack.value) {
      return
    }
    dropCardToHand(card)
  }
  // 从发动牌库中拿出一张卡片到手牌
  function dropCardToHand(card: Card) {
    if (isAttack.value || isAutoAttack.value) {
      return
    }
    dropCards.value.splice(dropCards.value.indexOf(card), 1)
    handCards.value.push(card)
  }
  // 使用完发动牌库后，重新放入卡片池
  function dropCardsToCardPool(card: Card) {
    dropCards.value = dropCards.value.filter(item => item.id !== card.id)
    cardPool.value.push(card)
  }
  function handCardsToCardPool(card: Card) {
    handCards.value = handCards.value.filter(item => item.id !== card.id)
    cardPool.value.push(card)
  }
  // 自动从手牌中收取4张卡片到发动牌库
  function autoDrawCardToDrop() {
    for (let i = 0; i < 4; i++) {
      if (handCards.value.length === 0) {
        break
      }
      drawCardToDrop(handCards.value[0])
    }
  }

  function getCenter(selector: string) {
    const element = document.querySelector(selector)
    if (!element) {
      throw new Error('未找到元素')
    }
    const rect = element.getBoundingClientRect()
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
  }

  function drawLine(start: { x: number, y: number }, end: { x: number, y: number }): Promise<void> {
    return new Promise((resolve) => {
      if (!attackCanvas.value) {
        throw new Error('未找到画布')
      }

      const canvas = attackCanvas.value
      const ctx = canvas.getContext('2d')

      const startTime = performance.now()
      const currentDuration = duration.value
      function animate(time: number) {
        const elapsed = time - startTime
        const t = Math.min(elapsed / currentDuration, 1) // 计算时间进度 0 到 1

        // 根据时间进度计算当前线条终点位置
        const currentX = start.x + (end.x - start.x) * t
        const currentY = start.y + (end.y - start.y) * t
        if (!ctx) {
          throw new Error('未找到上下文')
        }
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // 绘制线条
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        ctx.lineTo(currentX, currentY)
        ctx.stroke()

        if (t < 1) {
          requestAnimationFrame(animate)
        }
        else {
        // 动画结束后清除线条并 resolve
          setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            resolve()
          }, currentDuration) // 延迟 清除线条
        }
      }

      requestAnimationFrame(animate)
    })
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
    if (remainingHealth.isLessThan(0)) {
      if (character.props.type === 'our') {
        character.currentState.health = 0
        Message.info(`${character.props.name}角色已经死亡，发动卡中的卡牌将被移除，卡牌池中的卡牌将锁定保留。`)
        // 角色死亡，将其卡片从发动中移动到卡片池，并设置locked为true
        dropCards.value.forEach((card) => {
          if (card.owner === character.props.name) {
            dropCardsToCardPool(card)
          }
        })
        // 角色死亡，将其手牌中的卡牌移动到卡片池
        handCards.value.forEach((card) => {
          if (card.owner === character.props.name) {
            handCardsToCardPool(card)
          }
        })
        // 卡片池中的卡牌全部锁定
        cardPool.value.forEach((card) => {
          if (card.owner === character.props.name) {
            card.locked = true
          }
        })
      }
      else {
        character.currentState.health = 0
        Message.info(`${character.props.name}已倒下，游戏结束。`)
        isGameOver.value = true
      }
    }
    else {
      character.currentState.health = +remainingHealth.toFixed(0)
    }
  }

  async function startAttack() {
    isAttack.value = true
    try {
      while (dropCards.value.length > 0) {
        // 取出第一个元素
        const item = dropCards.value[0]
        const our = getCenter(`#${item.owner}`)
        const boss1 = getCenter('#boss1')
        await drawLine(our, boss1)
        const characterIdx = characterObjects.value.findIndex(c => c.props.name === item.owner)
        if (characterIdx === -1) {
          throw new Error('未找到角色')
        }
        // 计算角色攻击力
        const character = characterObjects.value[characterIdx]
        const attack = character.currentState.attack
        bossObjects.value.forEach((boss) => {
          receiveAttack(boss.id, attack)
        })
        // 将攻击完的卡片放入卡片池
        dropCardsToCardPool(item)
      }
      for await (const boss of bossObjects.value) {
        const boss1 = getCenter(`#${boss.props.name}`)
        // 在 characterObjects 过滤出可攻击的角色，也就是血量不为0
        const canAttackCharacterObjects = characterObjects.value.filter(character => character.currentState.health > 0)
        // 在 characterObjects 随机挑选一位
        const canAttackCharacterIdx = Math.floor(Math.random() * canAttackCharacterObjects.length)
        const canAttackCharacter = canAttackCharacterObjects[canAttackCharacterIdx]
        const our = getCenter(`#${canAttackCharacter.props.name}`)
        await drawLine(boss1, our)
        // 计算角色攻击力
        const attack = boss.currentState.attack
        receiveAttack(canAttackCharacter.id, attack)
      }
    }
    catch (error) {
      console.error(error)
    }
    // 如何角色全部死亡，游戏结束
    if (characterObjects.value.every(character => character.currentState.health <= 0)) {
      Message.info('游戏结束')
      isGameOver.value = true
    }
    else {
      pushHandCardsFromCardPool(maxHandCards - handCards.value.length)
    }
    isAttack.value = false
  }

  async function autoAttack() {
  // 自动攻击
    isAutoAttack.value = true
    while (isAutoAttack.value) {
      autoDrawCardToDrop()
      await startAttack()
    }
  }

  function stopAutoAttack() {
  // 停止自动攻击
    isAutoAttack.value = false
  }

  //
  return {
    isAttack,
    isAutoAttack,
    duration,
    isGameOver,

    attackCanvas,

    cardPool,
    handCards,
    dropCards,

    initStartCards,
    pushHandCardsFromCardPool,
    drawCardToDrop,
    dropCardToHand,
    dropCardsToCardPool,
    autoDrawCardToDrop,

    handleClickHandCard,
    handleClickDropCard,

    receiveAttack,

    startAttack,
    autoAttack,
    stopAutoAttack,

    initGame,
  }
}
