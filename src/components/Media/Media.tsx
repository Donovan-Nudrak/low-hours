import type { MediaTone } from '../../data/gallery'
import './Media.css'

interface MediaProps {
  src?: string | null
  alt?: string
  aspect?: string
  tone?: MediaTone
  className?: string
  objectPosition?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
}

export function Media({
  src,
  alt = '',
  aspect = '4 / 5',
  tone = 'brown',
  className,
  objectPosition = 'center',
  loading = 'lazy',
  fetchPriority = 'auto',
}: MediaProps) {
  const classes = ['lh-media', `lh-media--${tone}`, src ? 'has-image' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <figure className={classes} style={{ aspectRatio: aspect }} data-cursor="media">
      {src ? (
        <img
          className="lh-media__image"
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
          style={{ objectPosition }}
        />
      ) : null}
      <div className="lh-media__surface" aria-hidden="true" />
    </figure>
  )
}
