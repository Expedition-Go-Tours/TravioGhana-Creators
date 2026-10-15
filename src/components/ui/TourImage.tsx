import { useState } from 'react'

export default function TourImage({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const [err, setErr] = useState(false)
  if (err) {
    return <div className={className} style={{ ...style, background: 'var(--bg-paper)', display: 'grid', placeItems: 'center', color: 'var(--text-tertiary)', fontSize: 12 }}>No image</div>
  }
  return <img src={src} alt={alt} className={className} style={style} loading="lazy" onError={() => setErr(true)} />
}