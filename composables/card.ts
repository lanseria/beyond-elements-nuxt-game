import { nanoid } from 'nanoid'
import { characters } from './const'

type CardType = 'attack' | 'defense' | 'critRate' | 'critDamage' | 'toughness' | 'protection' | 'damageIncrease' | 'damageReduction'

class Card {
  public id: string
  public type: CardType
  public owner: string

  constructor(type: CardType, owner: string) {
    this.id = nanoid()
    this.type = type
    this.owner = owner
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

    receiveAttack,
    initCharacter,
    initBoss,
  }
  = useCharacter()

  const isAttack = ref(false)
  const isAutoAttack = ref(false)
  //
  const attackCanvas = shallowRef<HTMLCanvasElement>()
  // 卡片池
  const cardPool = useLocalStorage<Card[]>('cardPool', [])
  // 手牌
  const handCards = useLocalStorage<Card[]>('handCards', [])
  // 发动牌库
  const dropCards = useLocalStorage<Card[]>('dropCards', [])

  function initGame() {
    initCharacter(true)
    initBoss(true)
    initStartCards()
  }
  // 一次生成32张卡片去卡片池
  function _initCards() {
    cardPool.value = generateCardPool()
  }

  // 随机从卡片池中选择8张卡片
  function pushHandCardsFromCardPool(count: number = 8) {
    const selectedCards: Card[] = []

    while (selectedCards.length < count) {
      const randomIndex = Math.floor(Math.random() * cardPool.value.length)
      selectedCards.push(cardPool.value[randomIndex])
      cardPool.value.splice(randomIndex, 1) // 防止重复选择相同卡片
    }

    handCards.value.push(...selectedCards)
  }

  // 初始化
  function initStartCards() {
    // 初始化卡片池
    _initCards()
    // 清空手牌
    handCards.value = []
    // 随机从卡片池中选择8张卡片
    pushHandCardsFromCardPool()
    // 初始化发动牌库
    dropCards.value = []
  }

  // 从手牌中拿出一张卡片到发动牌库
  function drawCardToDrop(card: Card) {
    if (isAttack.value || isAutoAttack.value) {
      return
    }
    // 先判断发动牌库是否已满
    if (dropCards.value.length >= maxDropCards) {
      Message.warning('发动牌库已满，无法继续')
      return
    }
    handCards.value.splice(handCards.value.indexOf(card), 1)
    dropCards.value.push(card)
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

      const duration = 200 // 动画持续时间 500ms
      const startTime = performance.now()

      function animate(time: number) {
        const elapsed = time - startTime
        const t = Math.min(elapsed / duration, 1) // 计算时间进度 0 到 1

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
          }, 500) // 延迟 500ms 清除线条
        }
      }

      requestAnimationFrame(animate)
    })
  }

  async function startAttack() {
    isAttack.value = true
    try {
      for await (const item of dropCards.value) {
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
    pushHandCardsFromCardPool(maxHandCards - handCards.value.length)
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

    startAttack,
    autoAttack,
    stopAutoAttack,

    initGame,
  }
}
