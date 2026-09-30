import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import {
  Fragment,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react'
import { playlist, radioName } from '../../data/playlist'
import { useLanguage } from '../../i18n/language'
import { gsap } from '../../lib/gsap'
import { prefersReducedMotion, revealLines, revealUp } from '../../lib/animations'
import './Radio.css'

const DEMO_AUDIO_SRC = '/low-hours.mp3'
const LOFI_SLOT_ID = '00:00-02:00'
const DEMO_TRACK_LABEL = 'LOW HOURS — Lo-Fi Session'
const SEEK_STEP = 5
const SKIP_SECONDS = 10
const INITIAL_VOLUME = 0.7
const VOLUME_BARS = 8
const VOLUME_STEP = 0.05
const VOLUME_BUTTON_STEP = 1 / VOLUME_BARS

function slotIdFor(start: string, end: string) {
  return `${start}-${end}`
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function Radio() {
  const rootRef = useRef<HTMLElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState(LOFI_SLOT_ID)
  const [volume, setVolume] = useState(INITIAL_VOLUME)
  const [muted, setMuted] = useState(false)
  const volumeBeforeMute = useRef(INITIAL_VOLUME)
  const { language, localize, t } = useLanguage()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      revealLines('.radio__title', {
        scrollTrigger: { trigger: root, start: 'top 72%' },
      })
      revealUp('.radio__now, .radio__demo, .radio__slot', {
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: 'top 64%' },
      })
    }, root)

    return () => ctx.revert()
  }, [language])

  useLayoutEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = INITIAL_VOLUME
  }, [])

  const syncFromAudio = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    setCurrentTime(audio.currentTime)
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      setDuration(audio.duration)
    }
  }, [])

  const togglePlayback = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      try {
        await audio.play()
      } catch {
        setPlaying(false)
      }
      return
    }

    audio.pause()
  }, [])

  const skipBy = useCallback((delta: number) => {
    const audio = audioRef.current
    if (!audio) return
    const max =
      Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : Number.POSITIVE_INFINITY
    audio.currentTime = Math.min(max, Math.max(0, audio.currentTime + delta))
    setCurrentTime(audio.currentTime)
  }, [])

  const setVolumeLevel = useCallback((next: number) => {
    const audio = audioRef.current
    if (!audio) return
    const value = Math.min(1, Math.max(0, next))
    audio.volume = value
    audio.muted = value === 0
    setVolume(value)
    setMuted(value === 0)
    if (value > 0) volumeBeforeMute.current = value
  }, [])

  const setVolumeFromClientX = useCallback(
    (clientX: number, target: HTMLElement) => {
      const rect = target.getBoundingClientRect()
      if (rect.width === 0) return
      setVolumeLevel((clientX - rect.left) / rect.width)
    },
    [setVolumeLevel],
  )

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.muted || audio.volume === 0) {
      const restored = volumeBeforeMute.current > 0 ? volumeBeforeMute.current : INITIAL_VOLUME
      audio.muted = false
      audio.volume = restored
      setMuted(false)
      setVolume(restored)
      return
    }

    volumeBeforeMute.current = audio.volume
    audio.muted = true
    setMuted(true)
  }, [])

  const seekToRatio = useCallback((ratio: number) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return
    audio.currentTime = Math.min(audio.duration, Math.max(0, ratio * audio.duration))
    setCurrentTime(audio.currentTime)
  }, [])

  const onVolumePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId)
      setVolumeFromClientX(event.clientX, event.currentTarget)
    },
    [setVolumeFromClientX],
  )

  const onVolumePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
      setVolumeFromClientX(event.clientX, event.currentTarget)
    },
    [setVolumeFromClientX],
  )

  const onVolumeKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const current = muted || volume === 0 ? 0 : volume

      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        event.preventDefault()
        setVolumeLevel(current + VOLUME_STEP)
        return
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        event.preventDefault()
        setVolumeLevel(current - VOLUME_STEP)
        return
      }
      if (event.key === 'Home') {
        event.preventDefault()
        setVolumeLevel(0)
        return
      }
      if (event.key === 'End') {
        event.preventDefault()
        setVolumeLevel(1)
      }
    },
    [muted, setVolumeLevel, volume],
  )

  const onProgressPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect()
      if (rect.width === 0) return
      seekToRatio((event.clientX - rect.left) / rect.width)
    },
    [seekToRatio],
  )

  const onProgressKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const audio = audioRef.current
      if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return

      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        event.preventDefault()
        audio.currentTime = Math.min(audio.duration, audio.currentTime + SEEK_STEP)
        setCurrentTime(audio.currentTime)
        return
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        event.preventDefault()
        audio.currentTime = Math.max(0, audio.currentTime - SEEK_STEP)
        setCurrentTime(audio.currentTime)
        return
      }

      if (event.key === 'Home') {
        event.preventDefault()
        audio.currentTime = 0
        setCurrentTime(0)
        return
      }

      if (event.key === 'End') {
        event.preventDefault()
        audio.currentTime = audio.duration
        setCurrentTime(audio.duration)
      }
    },
    [],
  )

  const progress = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0
  const currentLabel = formatTime(currentTime)
  const durationLabel = formatTime(duration)
  const isMuted = muted || volume === 0
  const visualVolume = isMuted ? 0 : volume

  return (
    <section className="radio" data-section="radio" id="radio" ref={rootRef}>
      <audio
        ref={audioRef}
        src={DEMO_AUDIO_SRC}
        preload="metadata"
        loop
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={syncFromAudio}
        onLoadedMetadata={syncFromAudio}
        onDurationChange={syncFromAudio}
        onSeeked={syncFromAudio}
      />

      <div className="radio__grid lh-container">
        <div className="radio__intro">
          <p className="radio__eyebrow">{radioName}</p>
          <h2 className="radio__title" key={language}>
            {t.radio.titleLines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </Fragment>
            ))}
          </h2>
          <p className="radio__now">
            <span>{t.radio.nowPlaying}</span>
            {DEMO_TRACK_LABEL}
          </p>
          <p className="radio__demo">
            <span>{t.radio.demoEyebrow}</span>
            {t.radio.demoCopy}
          </p>
        </div>

        <div className="radio__player" data-cursor="radio">
          <div className={`radio__wave${playing ? ' is-playing' : ''}`} aria-hidden="true">
            {Array.from({ length: 28 }, (_, index) => (
              <span key={index} style={{ animationDelay: `${index * 0.04}s` }} />
            ))}
          </div>

          <div className="radio__timeline">
            <span className="radio__time">{currentLabel}</span>
            <div
              className="radio__progress"
              role="slider"
              tabIndex={0}
              aria-label={t.radio.progress}
              aria-valuemin={0}
              aria-valuemax={Math.round(duration) || 0}
              aria-valuenow={Math.round(currentTime)}
              aria-valuetext={`${currentLabel} / ${durationLabel}`}
              onPointerDown={onProgressPointerDown}
              onKeyDown={onProgressKeyDown}
            >
              <span style={{ transform: `scaleX(${progress})` }} />
            </div>
            <span className="radio__time">{durationLabel}</span>
          </div>

          <div className="radio__controls">
            <button
              className="radio__control radio__control--skip"
              type="button"
              aria-label={t.radio.rewind}
              title={t.radio.rewind}
              onClick={() => skipBy(-SKIP_SECONDS)}
            >
              −10
            </button>

            <button
              className="radio__control radio__control--play"
              type="button"
              aria-pressed={playing}
              aria-label={playing ? t.radio.pause : t.radio.play}
              title={playing ? t.radio.pause : t.radio.play}
              onClick={() => {
                void togglePlayback()
              }}
            >
              {playing ? <Pause size={18} strokeWidth={1.4} /> : <Play size={18} strokeWidth={1.4} />}
            </button>

            <button
              className="radio__control radio__control--skip"
              type="button"
              aria-label={t.radio.forward}
              title={t.radio.forward}
              onClick={() => skipBy(SKIP_SECONDS)}
            >
              +10
            </button>

            <button
              className="radio__control radio__control--mute"
              type="button"
              aria-pressed={isMuted}
              aria-label={isMuted ? t.radio.unmute : t.radio.mute}
              title={isMuted ? t.radio.unmute : t.radio.mute}
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX size={16} strokeWidth={1.4} /> : <Volume2 size={16} strokeWidth={1.4} />}
            </button>

            <div className="radio__volume-group">
              <button
                className="radio__control radio__control--nudge"
                type="button"
                aria-label={t.radio.volumeDown}
                title={t.radio.volumeDown}
                onClick={() => setVolumeLevel(visualVolume - VOLUME_BUTTON_STEP)}
              >
                −
              </button>

              <div
                className="radio__volume"
                role="slider"
                tabIndex={0}
                aria-label={t.radio.volume}
                title={t.radio.volume}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(visualVolume * 100)}
                aria-valuetext={`${Math.round(visualVolume * 100)}%`}
                onPointerDown={onVolumePointerDown}
                onPointerMove={onVolumePointerMove}
                onKeyDown={onVolumeKeyDown}
              >
                {Array.from({ length: VOLUME_BARS }, (_, index) => (
                  <span
                    key={index}
                    className={visualVolume >= (index + 0.35) / VOLUME_BARS ? 'is-on' : undefined}
                    style={{ height: `${34 + index * 8}%` }}
                  />
                ))}
              </div>

              <button
                className="radio__control radio__control--nudge"
                type="button"
                aria-label={t.radio.volumeUp}
                title={t.radio.volumeUp}
                onClick={() => setVolumeLevel(visualVolume + VOLUME_BUTTON_STEP)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <ol className="radio__schedule" aria-label={t.radio.schedule}>
          {playlist.map((block) => {
            const slotId = slotIdFor(block.start, block.end)
            const selected = slotId === selectedSlot

            return (
              <li className={`radio__slot${selected ? ' is-selected' : ''}`} key={slotId}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelectedSlot(slotId)}
                >
                  <p className="radio__slot-time">
                    {block.start}–{block.end}
                  </p>
                  <p className="radio__slot-sound">{localize(block.sound)}</p>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
