import type { LocalizedText } from '../i18n/translations'

export type GalleryOffset = 'none' | 'up' | 'down' | 'left'
export type GallerySpan = 'sm' | 'md' | 'lg'
export type MediaTone = 'espresso' | 'brown' | 'burgundy' | 'amber'

export interface GalleryImage {
  src: string | null
  alt: LocalizedText
  span: GallerySpan
  offset: GalleryOffset
  tone: MediaTone
  aspect: string
  objectPosition?: string
}

export const gallery: GalleryImage[] = [
  {
    src: '/gallery-window-rain.webp',
    alt: {
      en: 'Rainy café window overlooking the street at night',
      es: 'Ventana lluviosa de una cafetería con vista a la calle de noche',
    },
    span: 'lg',
    offset: 'up',
    tone: 'brown',
    aspect: '3 / 4',
  },
  {
    src: '/gallery-table-cup.webp',
    alt: {
      en: 'A warm café table with a cup of coffee',
      es: 'Una mesa cálida de cafetería con una taza de café',
    },
    span: 'sm',
    offset: 'down',
    tone: 'burgundy',
    aspect: '4 / 5',
  },
  {
    src: '/gallery-street-glass.webp',
    alt: {
      en: 'Street lights reflected through rain-covered glass',
      es: 'Luces de la calle reflejadas en un vidrio cubierto de lluvia',
    },
    span: 'md',
    offset: 'left',
    tone: 'espresso',
    aspect: '5 / 4',
    objectPosition: 'center right',
  },
  {
    src: '/gallery-books-laptop.webp',
    alt: {
      en: 'Books and a laptop beside a rainy café window',
      es: 'Libros y una laptop junto a una ventana lluviosa de la cafetería',
    },
    span: 'md',
    offset: 'up',
    tone: 'amber',
    aspect: '3 / 4',
  },
  {
    src: '/gallery-lamp-corner.webp',
    alt: {
      en: 'A lamp illuminating a quiet café corner',
      es: 'Una lámpara iluminando un rincón tranquilo de la cafetería',
    },
    span: 'sm',
    offset: 'none',
    tone: 'burgundy',
    aspect: '1 / 1',
  },
  {
    src: '/gallery-figures-blur.webp',
    alt: {
      en: 'People out of focus inside a café at night',
      es: 'Personas desenfocadas dentro de una cafetería por la noche',
    },
    span: 'lg',
    offset: 'down',
    tone: 'brown',
    aspect: '4 / 3',
    objectPosition: 'center',
  },
]
