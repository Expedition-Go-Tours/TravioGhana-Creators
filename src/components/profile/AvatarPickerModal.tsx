import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import { Field } from '../ui/Field'

const PRESETS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
]

export default function AvatarPickerModal({ open, onClose, current, onSave }: {
  open: boolean
  onClose: () => void
  current: string
  onSave: (url: string) => void
}) {
  const [url, setUrl] = useState(current)

  useEffect(() => {
    if (open) setUrl(current)
  }, [open, current])

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Change Photo"
      size="sm"
      footer={
        <>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => onSave(url)} disabled={!url.trim()}>Use photo</button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={url} alt="Selected avatar" style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--bg-paper)' }} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 10 }}>
            Pick a photo
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setUrl(p)}
                aria-label="Select avatar"
                style={{
                  padding: 0, border: url === p ? '2px solid var(--green)' : '2px solid transparent',
                  borderRadius: '50%', cursor: 'pointer', background: 'none', lineHeight: 0,
                }}
              >
                <img src={p} alt="" style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>
        <Field label="Or paste an image URL">
          <input className="input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" />
        </Field>
      </div>
    </Modal>
  )
}
