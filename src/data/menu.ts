import type { LocalizedText } from '../i18n/translations'

export type MenuCategory = 'coffee' | 'other' | 'bites'

export interface MenuItem {
  name: string
  price: number
  category: MenuCategory
  imageSrc?: string
  imageAlt?: LocalizedText
  objectPosition?: string
}

export const menu: MenuItem[] = [
  {
    name: 'House Coffee',
    price: 48,
    category: 'coffee',
    imageSrc: '/drink-house-coffee.webp',
    imageAlt: {
      en: 'House Coffee on a late-night café table',
      es: 'House Coffee sobre una mesa de cafetería por la noche',
    },
    objectPosition: 'center',
  },
  {
    name: 'Espresso',
    price: 48,
    category: 'coffee',
    imageSrc: '/drink-espresso.webp',
    imageAlt: {
      en: 'Espresso on a late-night café table',
      es: 'Espresso sobre una mesa de cafetería por la noche',
    },
    objectPosition: 'center',
  },
  {
    name: 'Americano',
    price: 52,
    category: 'coffee',
    imageSrc: '/drink-americano.webp',
    imageAlt: {
      en: 'Americano on a late-night café table',
      es: 'Americano sobre una mesa de cafetería por la noche',
    },
    objectPosition: 'center',
  },
  {
    name: 'Flat White',
    price: 65,
    category: 'coffee',
    imageSrc: '/drink-flat-white.webp',
    imageAlt: {
      en: 'Flat White on a late-night café table',
      es: 'Flat White sobre una mesa de cafetería por la noche',
    },
    objectPosition: 'center',
  },
  {
    name: 'Café Latte',
    price: 68,
    category: 'coffee',
    imageSrc: '/drink-cafe-latte.webp',
    imageAlt: {
      en: 'Café Latte on a late-night café table',
      es: 'Café Latte sobre una mesa de cafetería por la noche',
    },
    objectPosition: 'center',
  },
  {
    name: 'Mocha',
    price: 72,
    category: 'coffee',
    imageSrc: '/drink-mocha.webp',
    imageAlt: {
      en: 'Mocha on a late-night café table',
      es: 'Mocha sobre una mesa de cafetería por la noche',
    },
    objectPosition: 'center',
  },
  {
    name: 'Cold Brew',
    price: 70,
    category: 'coffee',
    imageSrc: '/drink-cold-brew.webp',
    imageAlt: {
      en: 'Cold Brew beside a laptop at night',
      es: 'Cold Brew junto a una laptop por la noche',
    },
    objectPosition: 'center',
  },
  {
    name: 'Vanilla Latte',
    price: 75,
    category: 'other',
    imageSrc: '/drink-vanilla-latte.webp',
    imageAlt: {
      en: 'Vanilla Latte on a late-night café table',
      es: 'Vanilla Latte sobre una mesa de cafetería por la noche',
    },
    objectPosition: 'center',
  },
  {
    name: 'Matcha Latte',
    price: 75,
    category: 'other',
    imageSrc: '/drink-matcha-latte.webp',
    imageAlt: {
      en: 'Matcha Latte on a late-night café table',
      es: 'Matcha Latte sobre una mesa de cafetería por la noche',
    },
    objectPosition: 'center',
  },
  {
    name: 'Hot Chocolate',
    price: 68,
    category: 'other',
    imageSrc: '/drink-hot-chocolate.webp',
    imageAlt: {
      en: 'Hot Chocolate on a late-night café table',
      es: 'Hot Chocolate sobre una mesa de cafetería por la noche',
    },
    objectPosition: 'center',
  },
  {
    name: 'Rainy Day Latte',
    price: 78,
    category: 'other',
    imageSrc: '/drink-rainy-day-latte.webp',
    imageAlt: {
      en: 'Rainy Day Latte beside a café window',
      es: 'Rainy Day Latte junto a una ventana de la cafetería',
    },
    objectPosition: 'center',
  },
  {
    name: 'Late Night Mocha',
    price: 82,
    category: 'other',
    imageSrc: '/drink-latte-nigth-mocha.webp',
    imageAlt: {
      en: 'Late Night Mocha on a late-night café table',
      es: 'Late Night Mocha sobre una mesa de cafetería por la noche',
    },
    objectPosition: 'center top',
  },
  {
    name: 'Butter Croissant',
    price: 55,
    category: 'bites',
    imageSrc: '/food-butter-croissant.webp',
    imageAlt: {
      en: 'Butter Croissant on a café plate',
      es: 'Butter Croissant en un plato de cafetería',
    },
    objectPosition: 'center',
  },
  {
    name: 'Cinnamon Roll',
    price: 65,
    category: 'bites',
    imageSrc: '/food-cinnamon-roll.webp',
    imageAlt: {
      en: 'Cinnamon Roll on a café plate',
      es: 'Cinnamon Roll en un plato de cafetería',
    },
    objectPosition: 'center',
  },
  {
    name: 'Grilled Cheese',
    price: 95,
    category: 'bites',
    imageSrc: '/food-grilled-cheese.webp',
    imageAlt: {
      en: 'Grilled Cheese on a café plate',
      es: 'Grilled Cheese en un plato de cafetería',
    },
    objectPosition: 'center',
  },
  {
    name: 'Chocolate Cake',
    price: 78,
    category: 'bites',
    imageSrc: '/food-chocolate-cake.webp',
    imageAlt: {
      en: 'Chocolate Cake on a café plate',
      es: 'Chocolate Cake en un plato de cafetería',
    },
    objectPosition: 'center',
  },
]

export const menuCategories: { id: MenuCategory; label: LocalizedText }[] = [
  { id: 'coffee', label: { en: 'Coffee', es: 'Café' } },
  { id: 'other', label: { en: 'Other drinks', es: 'Otras bebidas' } },
  { id: 'bites', label: { en: 'Late bites', es: 'Algo para comer' } },
]

export const menuByCategory = menuCategories.map((group) => ({
  ...group,
  items: menu.filter((item) => item.category === group.id),
}))

const featuredNames = ['Rainy Day Latte', 'Late Night Mocha', 'Cold Brew']

export const featuredDrinks = featuredNames
  .map((name) => menu.find((item) => item.name === name))
  .filter((item): item is MenuItem => item !== undefined)
