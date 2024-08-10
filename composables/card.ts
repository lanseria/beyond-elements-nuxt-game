import { characters } from './const'

type CardType = 'attack' | 'defense' | 'critRate' | 'critDamage' | 'toughness' | 'protection' | 'damageIncrease' | 'damageReduction'

class Card {
  public type: CardType
  public owner: string

  constructor(type: CardType, owner: string) {
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
  const handCards = ref<Card[]>()

  // 随机从卡片池中选择8张卡片
  function initRandomCards(count: number = 8) {
    const cardPool = generateCardPool()
    const selectedCards: Card[] = []

    while (selectedCards.length < count) {
      const randomIndex = Math.floor(Math.random() * cardPool.length)
      selectedCards.push(cardPool[randomIndex])
      cardPool.splice(randomIndex, 1) // 防止重复选择相同卡片
    }

    handCards.value = selectedCards
  }
  return {
    handCards,

    initRandomCards,
  }
}
