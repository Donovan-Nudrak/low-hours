import type { LocalizedText } from '../i18n/translations'

export interface NavLink {
  id: string
  label: LocalizedText
}

export const navLinks: NavLink[] = [
  { id: 'hero', label: { en: 'Home', es: 'Inicio' } },
  { id: 'night', label: { en: 'Night', es: 'Noche' } },
  { id: 'coffee', label: { en: 'Coffee', es: 'Café' } },
  { id: 'space', label: { en: 'Space', es: 'Espacio' } },
  { id: 'radio', label: { en: 'Radio', es: 'Radio' } },
  { id: 'menu', label: { en: 'Menu', es: 'Menú' } },
  { id: 'gallery', label: { en: 'Gallery', es: 'Galería' } },
  { id: 'reservations', label: { en: 'Reservations', es: 'Reservas' } },
  { id: 'location', label: { en: 'Visit Us', es: 'Visítanos' } },
]
