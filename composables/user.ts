export const AVATARS = [
  {
    name: 'Piglet',
    id: '23',
  },
  {
    name: 'Cat',
    id: '36',
  },
  {
    name: 'Fish',
    id: '37',
  },
  {
    name: 'Fox',
    id: '38',
  },
  {
    name: 'Chicken',
    id: '46',
  },
  {
    name: 'Goat',
    id: '50',
  },
  {
    name: 'Ram',
    id: '51',
  },
  {
    name: 'Sheep',
    id: '52',
  },
  {
    name: 'Bison',
    id: '59',
  },
  {
    name: 'Dog',
    id: '61',
  },
  {
    name: 'Walrus',
    id: '62',
  },
  {
    name: 'Dog',
    id: '63',
  },
  {
    name: 'Monkey',
    id: '64',
  },
  {
    name: 'Bear',
    id: '65',
  },
  {
    name: 'Lion',
    id: '66',
  },
  {
    name: 'Zebra',
    id: '67',
  },
  {
    name: 'Giraffe',
    id: '68',
  },
  {
    name: 'Bear',
    id: '71',
  },
  {
    name: 'Wolf',
    id: '74',
  },
  {
    name: 'Rhino',
    id: '86',
  },
  {
    name: 'Bat',
    id: '87',
  },
  {
    name: 'Cat',
    id: '95',
  },
  {
    name: 'Penguin',
    id: '102',
  },
  {
    name: 'Rhino',
    id: '109',
  },
  {
    name: 'Koala',
    id: '112',
  },
]
export function sampleAvatar(): string {
  return `/assets/images/avatars/${AVATARS[Math.floor(Math.random() * AVATARS.length)].id}.svg`
}
