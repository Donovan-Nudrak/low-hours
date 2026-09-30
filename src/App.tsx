import { useLayoutEffect, useState } from 'react'
import { Cursor } from './components/Cursor/Cursor'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Preloader } from './components/Preloader/Preloader'
import { useGlobalBackground } from './hooks/useGlobalBackground'
import { useLenis } from './hooks/useLenis'
import { useLanguage } from './i18n/language'
import { ScrollTrigger } from './lib/gsap'
import { Coffee } from './sections/Coffee/Coffee'
import { Gallery } from './sections/Gallery/Gallery'
import { Hero } from './sections/Hero/Hero'
import { Location } from './sections/Location/Location'
import { Menu } from './sections/Menu/Menu'
import { Night } from './sections/Night/Night'
import { Radio } from './sections/Radio/Radio'
import { Reservations } from './sections/Reservations/Reservations'
import { Space } from './sections/Space/Space'

function App() {
  const [ready, setReady] = useState(false)
  const { language } = useLanguage()
  useLenis()
  useGlobalBackground()

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [language])

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <Cursor />
      <Header ready={ready} />
      <main>
        <Hero ready={ready} />
        <Night />
        <Coffee />
        <Space />
        <Radio />
        <Menu />
        <Gallery />
        <Reservations />
        <Location />
      </main>
      <Footer />
    </>
  )
}

export default App
