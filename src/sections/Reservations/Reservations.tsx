import { ArrowRight } from 'lucide-react'
import { useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import { useLanguage } from '../../i18n/language'
import { gsap } from '../../lib/gsap'
import { prefersReducedMotion, revealUp } from '../../lib/animations'
import './Reservations.css'

type RequiredField = 'name' | 'email' | 'date' | 'time' | 'guests' | 'preference'
type FieldErrors = Partial<Record<RequiredField, string>>

const requiredFields: RequiredField[] = [
  'name',
  'email',
  'date',
  'time',
  'guests',
  'preference',
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const guestOptions = ['1', '2', '3', '4', '5', '6+'] as const

const tablePreferences = [
  'window',
  'interior',
  'quietArea',
  'bar',
  'any',
] as const

const preferenceValues: Record<(typeof tablePreferences)[number], string> = {
  window: 'window',
  interior: 'interior',
  quietArea: 'quiet-area',
  bar: 'bar',
  any: 'any',
}

export function Reservations() {
  const rootRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const { t } = useLanguage()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      revealUp('.reservations__heading, .reservations__copy', {
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: 'top 74%' },
      })
      revealUp('.reservations__form', {
        scrollTrigger: { trigger: root, start: 'top 66%' },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  const clearError = (field: RequiredField) => {
    if (!errors[field]) return

    setErrors((current) => {
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const values = Object.fromEntries(
      requiredFields.map((field) => [field, String(formData.get(field) ?? '').trim()]),
    ) as Record<RequiredField, string>
    const nextErrors: FieldErrors = {}

    requiredFields.forEach((field) => {
      if (!values[field]) {
        nextErrors[field] = t.reservations.requiredError
      }
    })

    if (values.email && !emailPattern.test(values.email)) {
      nextErrors.email = t.reservations.emailError
    }

    const firstInvalidField = requiredFields.find((field) => nextErrors[field])
    setErrors(nextErrors)

    if (firstInvalidField) {
      const control = form.querySelector(`[name="${firstInvalidField}"]`)
      if (control instanceof HTMLElement) control.focus()
      return
    }

    setSubmitted(true)
  }

  const errorMessage = (field: RequiredField) =>
    errors[field] ? (
      <p className="reservations__error" id={`reservation-${field}-error`} role="alert">
        {errors[field]}
      </p>
    ) : null

  return (
    <section
      className="reservations"
      data-section="reservations"
      id="reservations"
      ref={rootRef}
    >
      <div className="reservations__grid lh-container">
        <div className="reservations__intro">
          <p className="reservations__number">08</p>
          <h2 className="reservations__heading">{t.reservations.heading}</h2>
          <p className="reservations__copy">{t.reservations.copy}</p>
        </div>

        {submitted ? (
          <div className="reservations__confirmation" aria-live="polite" role="status">
            <p>{t.reservations.confirmationTitle}</p>
            <p>{t.reservations.confirmationCopy}</p>
            <button
              type="button"
              onClick={() => {
                setErrors({})
                setSubmitted(false)
              }}
            >
              {t.reservations.anotherReservation}
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        ) : (
          <form className="reservations__form" onSubmit={handleSubmit} noValidate>
            <div className="reservations__field">
              <label htmlFor="reservation-name">{t.reservations.name}</label>
              <input
                id="reservation-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'reservation-name-error' : undefined}
                onChange={() => clearError('name')}
              />
              {errorMessage('name')}
            </div>

            <div className="reservations__field">
              <label htmlFor="reservation-email">{t.reservations.email}</label>
              <input
                id="reservation-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'reservation-email-error' : undefined}
                onChange={() => clearError('email')}
              />
              {errorMessage('email')}
            </div>

            <div className="reservations__field">
              <label htmlFor="reservation-date">{t.reservations.date}</label>
              <input
                id="reservation-date"
                name="date"
                type="date"
                required
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? 'reservation-date-error' : undefined}
                onChange={() => clearError('date')}
              />
              {errorMessage('date')}
            </div>

            <div className="reservations__field">
              <label htmlFor="reservation-time">{t.reservations.time}</label>
              <input
                id="reservation-time"
                name="time"
                type="time"
                required
                aria-invalid={Boolean(errors.time)}
                aria-describedby={errors.time ? 'reservation-time-error' : undefined}
                onChange={() => clearError('time')}
              />
              {errorMessage('time')}
            </div>

            <div className="reservations__field">
              <label htmlFor="reservation-guests">{t.reservations.guests}</label>
              <select
                id="reservation-guests"
                name="guests"
                defaultValue=""
                required
                aria-invalid={Boolean(errors.guests)}
                aria-describedby={errors.guests ? 'reservation-guests-error' : undefined}
                onChange={() => clearError('guests')}
              >
                <option value="" disabled>
                  {t.reservations.selectOption}
                </option>
                {guestOptions.map((guestCount) => (
                  <option value={guestCount} key={guestCount}>
                    {guestCount}
                  </option>
                ))}
              </select>
              {errorMessage('guests')}
            </div>

            <fieldset
              className="reservations__field reservations__field--preference"
              aria-invalid={Boolean(errors.preference)}
              aria-describedby={
                errors.preference ? 'reservation-preference-error' : undefined
              }
            >
              <legend>{t.reservations.tablePreference}</legend>
              <div className="reservations__options" role="presentation">
                {tablePreferences.map((preference) => (
                  <label key={preference}>
                    <input
                      type="radio"
                      name="preference"
                      value={preferenceValues[preference]}
                      required
                      onChange={() => clearError('preference')}
                    />
                    <span>{t.reservations[preference]}</span>
                  </label>
                ))}
              </div>
              {errorMessage('preference')}
            </fieldset>

            <fieldset className="reservations__field reservations__field--ride">
              <legend>{t.reservations.rideHome}</legend>
              <div className="reservations__options" role="presentation">
                <label>
                  <input type="radio" name="rideHome" value="no" defaultChecked />
                  <span>{t.reservations.rideNo}</span>
                </label>
                <label>
                  <input type="radio" name="rideHome" value="yes" />
                  <span>{t.reservations.rideYes}</span>
                </label>
              </div>
            </fieldset>

            <button className="reservations__submit" type="submit">
              {t.reservations.reserve}
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
