import { useEffect, useState } from 'react'
import { Building2, Smartphone } from 'lucide-react'
import Modal from '../ui/Modal'
import { Field } from '../ui/Field'
import type { PayoutMethod } from '../../store/types'

const SUGGESTIONS: Record<'bank' | 'mobile', string[]> = {
  bank: ['Ecobank Ghana', 'GCB Bank', 'Stanbic Bank', 'Absa Ghana'],
  mobile: ['MTN MoMo', 'Vodafone Cash', 'AirtelTigo Money'],
}

export default function AddMethodModal({ open, onClose, isFirst, onAdd }: {
  open: boolean
  onClose: () => void
  isFirst: boolean
  onAdd: (method: PayoutMethod) => void
}) {
  const [type, setType] = useState<'bank' | 'mobile'>('bank')
  const [label, setLabel] = useState('')
  const [details, setDetails] = useState('')

  useEffect(() => {
    if (open) {
      setType('bank')
      setLabel('')
      setDetails('')
    }
  }, [open])

  const canSubmit = label.trim() !== '' && details.trim() !== ''

  const submit = () => {
    if (!canSubmit) return
    onAdd({
      id: `pm-${Date.now().toString(36)}`,
      type,
      label: label.trim(),
      details: details.trim(),
      isDefault: isFirst,
    })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Payout Method"
      size="sm"
      footer={
        <>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary btn-sm" onClick={submit} disabled={!canSubmit}>Add method</button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 8 }}>
            Method type
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {(['bank', 'mobile'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: 14,
                  background: type === t ? 'var(--green-bg)' : 'var(--bg-surface)',
                  border: `${type === t ? 2 : 1}px solid ${type === t ? 'var(--green)' : 'var(--border)'}`,
                  borderRadius: 'var(--r-lg)', cursor: 'pointer', fontSize: 13, fontWeight: 700,
                  fontFamily: 'var(--font-display)', color: 'var(--text-primary)',
                }}
              >
                {t === 'bank' ? <Building2 size={18} /> : <Smartphone size={18} />}
                {t === 'bank' ? 'Bank account' : 'Mobile money'}
              </button>
            ))}
          </div>
        </div>

        <Field label={type === 'bank' ? 'Bank' : 'Provider'} hint="e.g. Ecobank Ghana or MTN MoMo">
          <input className="input" value={label} onChange={(e) => setLabel(e.target.value)} placeholder={SUGGESTIONS[type][0]} list="method-labels" />
          <datalist id="method-labels">
            {SUGGESTIONS[type].map((s) => <option key={s} value={s} />)}
          </datalist>
        </Field>

        <Field label={type === 'bank' ? 'Account details' : 'Number'} hint={type === 'bank' ? 'Account name · masked number' : '+233 …'}>
          <input className="input" value={details} onChange={(e) => setDetails(e.target.value)} placeholder={type === 'bank' ? 'Ecobank Ghana · ****4523' : '+233 24 000 0000'} />
        </Field>

        {isFirst && (
          <div style={{ fontSize: 12, color: 'var(--green-dark)', background: 'var(--green-bg)', padding: '10px 12px', borderRadius: 'var(--r-md)' }}>
            This will be your default payout method.
          </div>
        )}
      </div>
    </Modal>
  )
}
