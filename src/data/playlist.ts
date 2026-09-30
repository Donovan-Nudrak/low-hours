import type { LocalizedText } from '../i18n/translations'

export interface PlaylistBlock {
  start: string
  end: string
  sound: LocalizedText
}

export const radioName = 'LOW HOURS RADIO'

export const playlist: PlaylistBlock[] = [
  { start: '18:00', end: '21:00', sound: { en: 'Jazz / soul', es: 'Jazz / soul' } },
  {
    start: '21:00',
    end: '00:00',
    sound: { en: 'Bedroom pop / city pop', es: 'Bedroom pop / city pop' },
  },
  {
    start: '00:00',
    end: '02:00',
    sound: { en: 'Lo-fi hip hop / chillhop', es: 'Lo-fi hip hop / chillhop' },
  },
  {
    start: '02:00',
    end: '04:00',
    sound: { en: 'Ambient / downtempo', es: 'Ambient / downtempo' },
  },
]
