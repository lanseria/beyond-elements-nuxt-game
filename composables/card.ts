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
  // 卡片池
  const cardPool = useLocalStorage<Card[]>('cardPool', [])
  // 手牌
  const handCards = useLocalStorage<Card[]>('handCards', [])
  // 发动牌库
  const dropCards = useLocalStorage<Card[]>('dropCards', [])

  // 一次生成32张卡片去卡片池
  function _initCards() {
    cardPool.value = generateCardPool()
  }

  // 随机从卡片池中选择8张卡片
  function _initHandCards(count: number = 8) {
    const selectedCards: Card[] = []

    while (selectedCards.length < count) {
      const randomIndex = Math.floor(Math.random() * cardPool.value.length)
      selectedCards.push(cardPool.value[randomIndex])
      cardPool.value.splice(randomIndex, 1) // 防止重复选择相同卡片
    }

    handCards.value = selectedCards
  }

  // 初始化
  function initStartCards() {
    // 初始化卡片池
    _initCards()
    // 随机从卡片池中选择8张卡片
    _initHandCards()
    // 初始化发动牌库
    dropCards.value = []
  }

  // 从手牌中拿出一张卡片到发动牌库
  function drawCardToDrop(card: Card) {
    handCards.value.splice(handCards.value.indexOf(card), 1)
    dropCards.value.push(card)
  }

  // 从发动牌库中拿出一张卡片到手牌
  function dropCardToHand(card: Card) {
    dropCards.value.splice(dropCards.value.indexOf(card), 1)
    handCards.value.push(card)
  }

  //
  return {
    handCards,
    dropCards,

    initStartCards,
    drawCardToDrop,
    dropCardToHand,
  }
}
