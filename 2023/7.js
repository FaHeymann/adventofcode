const input = require("fs").readFileSync("inputs/2023/7.txt").toString();

const order = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const typeOrder = [
  'five_of_a_kind',
  'four_of_a_kind',
  'full_house',
  'three_of_a_kind',
  'two_pair',
  'one_pair',
  'high_card'
]

const getType = (hand) => {
  const buckets = {}
  hand.forEach(card => {
    const type = order.findIndex(i => i === card)
    if (!buckets[type]) {
      buckets[type] = 1
    } else {
      buckets[type] += 1
    }
  })
  if (Object.values(buckets).includes(5)) {
    return 'five_of_a_kind'
  } else if (Object.values(buckets).includes(4)) {
    return 'four_of_a_kind'
  } else if (Object.values(buckets).includes(3) && Object.values(buckets).includes(2)) {
    return 'full_house'
  } else if (Object.values(buckets).includes(3)) {
    return 'three_of_a_kind'
  } else if (Object.values(buckets).filter(n => n === 2).length === 2) {
    return 'two_pair'
  } else if (Object.values(buckets).includes(2)) {
    return 'one_pair'
  } else {
    return 'high_card'
  }
}

const hands = input.split('\n').map(line => {
  const [cards, bid] = line.split(' ');
  return {
    cards: cards.split(''),
    bid: parseInt(bid, 10),
    type: getType(cards.split(''))
  }
})

const compare = (a, b) => {
  const typeIndexA = typeOrder.findIndex(v => v === a.type)
  const typeIndexB = typeOrder.findIndex(v => v === b.type)

  if (typeIndexA < typeIndexB) {
    return 1
  }
  if (typeIndexA > typeIndexB) {
    return -1
  }

  for (let i = 0; i < 5; i++) {
    const cardIndexA = order.findIndex(v => v === a.cards[i])
    const cardIndexB = order.findIndex(v => v === b.cards[i])

    if (cardIndexA < cardIndexB) {
      return 1
    }
    if (cardIndexA > cardIndexB) {
      return -1
    }
  }


  return 0
}

hands.sort(compare)

let score = 0

hands.forEach((hand, index) => {
  score += (index + 1) * hand.bid
})

console.log(score)
