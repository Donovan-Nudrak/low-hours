export type Language = 'en' | 'es'

export type LocalizedText = Readonly<Record<Language, string>>

interface ImageTranslation {
  alt: string
}

export interface TranslationDictionary {
  language: {
    selector: string
    english: string
    spanish: string
  }
  header: {
    primaryNavigation: string
    mobileNavigation: string
    openMenu: string
    closeMenu: string
  }
  hero: {
    titleLines: readonly string[]
    slogan: string
    status: string
    cta: string
    media: ImageTranslation
  }
  night: {
    eyebrow: string
    titleLines: readonly string[]
    media: ImageTranslation
    primaryCopy: string
    secondaryCopy: string
    note: string
  }
  coffee: {
    titleLines: readonly string[]
  }
  space: {
    titleLines: readonly string[]
    copyLines: readonly string[]
    window: ImageTranslation
    table: ImageTranslation
    lamp: ImageTranslation
  }
  radio: {
    titleLines: readonly string[]
    nowPlaying: string
    play: string
    pause: string
    schedule: string
    demoEyebrow: string
    demoCopy: string
    progress: string
    rewind: string
    forward: string
    mute: string
    unmute: string
    volume: string
    volumeDown: string
    volumeUp: string
  }
  menu: {
    title: string
  }
  gallery: {
    title: string
  }
  reservations: {
    heading: string
    copy: string
    name: string
    email: string
    date: string
    time: string
    guests: string
    tablePreference: string
    window: string
    interior: string
    quietArea: string
    bar: string
    any: string
    rideHome: string
    rideNo: string
    rideYes: string
    selectOption: string
    reserve: string
    requiredError: string
    emailError: string
    confirmationTitle: string
    confirmationCopy: string
    anotherReservation: string
  }
  location: {
    titleLines: readonly string[]
    open: string
    city: string
    directions: string
    copy: string
  }
  footer: {
    tagline: string
    navigation: string
    credit: string
    linkedin: string
    github: string
    portfolio: string
  }
}

export const translations = {
  en: {
    language: {
      selector: 'Language',
      english: 'Switch to English',
      spanish: 'Switch to Spanish',
    },
    header: {
      primaryNavigation: 'Primary navigation',
      mobileNavigation: 'Mobile navigation',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      titleLines: ['LOW', 'HOURS'],
      slogan: 'Coffee. Music. Late nights.',
      status: 'Open late.',
      cta: 'Come inside',
      media: {
        alt: 'Rainy café window overlooking the city at night',
      },
    },
    night: {
      eyebrow: 'The hour in between',
      titleLines: ['The night', 'slows down.'],
      media: {
        alt: 'Empty rain-soaked city street at night',
      },
      primaryCopy: 'For nights with nowhere to be.',
      secondaryCopy: 'A warm table and nowhere else you need to be.',
      note: 'Some nights don’t need a plan.',
    },
    coffee: {
      titleLines: ['Coffee', 'tastes different', 'after midnight.'],
    },
    space: {
      titleLines: ['Take', 'your time.'],
      copyLines: ['A warm table', 'and nowhere else', 'you need to be.'],
      window: {
        alt: 'Café table beside a rainy city window',
      },
      table: {
        alt: 'Late-night workspace overlooking the city',
      },
      lamp: {
        alt: 'Warmly lit workspace beside a rainy window',
      },
    },
    radio: {
      titleLines: ['Low Hours', 'Radio'],
      nowPlaying: 'Now playing',
      play: 'Play',
      pause: 'Pause',
      schedule: "Tonight's selection",
      demoEyebrow: 'Demo audio',
      demoCopy: 'Only the Lo-Fi station is currently available.',
      progress: 'Playback progress',
      rewind: 'Rewind 10 seconds',
      forward: 'Forward 10 seconds',
      mute: 'Mute',
      unmute: 'Unmute',
      volume: 'Volume',
      volumeDown: 'Volume down',
      volumeUp: 'Volume up',
    },
    menu: {
      title: 'Menu',
    },
    gallery: {
      title: 'Gallery',
    },
    reservations: {
      heading: 'Reserve a table',
      copy: 'Stay a little longer. We’ll save you a table.',
      name: 'Name',
      email: 'Email',
      date: 'Date',
      time: 'Time',
      guests: 'Guests',
      tablePreference: 'Table preference',
      window: 'Window',
      interior: 'Interior',
      quietArea: 'Quiet area',
      bar: 'Bar',
      any: 'Any',
      rideHome: 'Ride home',
      rideNo: 'No',
      rideYes: 'Yes',
      selectOption: 'Select',
      reserve: 'Reserve',
      requiredError: 'This field is required.',
      emailError: 'Enter a valid email address.',
      confirmationTitle: 'Reservation received.',
      confirmationCopy: 'We’ll keep your table ready.',
      anotherReservation: 'Make another reservation',
    },
    location: {
      titleLines: ['The city gets', 'quieter from here.'],
      open: 'Open',
      city: 'Mexico City',
      directions: 'Get Directions',
      copy: 'Music low. Coffee warm. City quiet.',
    },
    footer: {
      tagline: 'Late-night coffee house',
      navigation: 'Footer navigation',
      credit: 'Designed & developed by Donovan',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      portfolio: 'Portfolio',
    },
  },
  es: {
    language: {
      selector: 'Idioma',
      english: 'Cambiar a inglés',
      spanish: 'Cambiar a español',
    },
    header: {
      primaryNavigation: 'Navegación principal',
      mobileNavigation: 'Navegación móvil',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
    hero: {
      titleLines: ['LOW', 'HOURS'],
      slogan: 'Café. Música. Madrugada.',
      status: 'Abierto hasta tarde.',
      cta: 'Entra',
      media: {
        alt: 'Ventana lluviosa de una cafetería con vista a la ciudad de noche',
      },
    },
    night: {
      eyebrow: 'La hora intermedia',
      titleLines: ['La noche', 'baja el ritmo.'],
      media: {
        alt: 'Calle vacía de la ciudad, mojada por la lluvia durante la noche',
      },
      primaryCopy: 'Para noches en las que no hay prisa por llegar.',
      secondaryCopy: 'Una mesa cálida y ningún otro lugar al que tengas que ir.',
      note: 'Algunas noches no necesitan un plan.',
    },
    coffee: {
      titleLines: ['El café', 'sabe diferente', 'después de medianoche.'],
    },
    space: {
      titleLines: ['Tómate', 'tu tiempo.'],
      copyLines: ['Una mesa cálida', 'y ningún otro lugar', 'al que tengas que ir.'],
      window: {
        alt: 'Mesa de cafetería junto a una ventana lluviosa de la ciudad',
      },
      table: {
        alt: 'Espacio de trabajo nocturno con vista a la ciudad',
      },
      lamp: {
        alt: 'Espacio de trabajo con luz cálida junto a una ventana lluviosa',
      },
    },
    radio: {
      titleLines: ['Low Hours', 'Radio'],
      nowPlaying: 'Sonando ahora',
      play: 'Reproducir',
      pause: 'Pausar',
      schedule: 'Selección de esta noche',
      demoEyebrow: 'Audio de demostración',
      demoCopy: 'Actualmente solo está disponible la estación Lo-Fi.',
      progress: 'Progreso de reproducción',
      rewind: 'Retroceder 10 segundos',
      forward: 'Avanzar 10 segundos',
      mute: 'Silenciar',
      unmute: 'Activar sonido',
      volume: 'Volumen',
      volumeDown: 'Bajar volumen',
      volumeUp: 'Subir volumen',
    },
    menu: {
      title: 'Menú',
    },
    gallery: {
      title: 'Galería',
    },
    reservations: {
      heading: 'Reserva una mesa',
      copy: 'Quédate un poco más. Te guardamos una mesa.',
      name: 'Nombre',
      email: 'Correo',
      date: 'Fecha',
      time: 'Hora',
      guests: 'Personas',
      tablePreference: 'Preferencia de mesa',
      window: 'Ventana',
      interior: 'Interior',
      quietArea: 'Zona tranquila',
      bar: 'Barra',
      any: 'Cualquiera',
      rideHome: 'Transporte al salir',
      rideNo: 'No',
      rideYes: 'Sí',
      selectOption: 'Selecciona',
      reserve: 'Reservar',
      requiredError: 'Este campo es obligatorio.',
      emailError: 'Introduce un correo válido.',
      confirmationTitle: 'Reserva recibida.',
      confirmationCopy: 'Tendremos tu mesa lista.',
      anotherReservation: 'Hacer otra reserva',
    },
    location: {
      titleLines: ['Desde aquí,', 'la ciudad se vuelve', 'más tranquila.'],
      open: 'Abierto',
      city: 'Mexico City',
      directions: 'Cómo llegar',
      copy: 'Música baja. Café caliente. Ciudad tranquila.',
    },
    footer: {
      tagline: 'Cafetería nocturna',
      navigation: 'Navegación del pie de página',
      credit: 'Diseñado y desarrollado por Donovan',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      portfolio: 'Portafolio',
    },
  },
} as const satisfies Record<Language, TranslationDictionary>
