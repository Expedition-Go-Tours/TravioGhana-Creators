import { Building2, Smartphone, CheckCircle2 } from 'lucide-react'
import Modal from '../ui/Modal'
import type { PayoutMethod } from '../../store/types'

interface Props {
  open: boolean
  onClose: () => void
  methods: PayoutMethod[]
  onSelect: (id: string) => void
}

export default function MethodPickerModal({ open, onClose, methods, onSelect }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Default payout method"
      size="sm"
      footer={<button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Close</button>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          Payouts are sent to your default method. Choose which one to use.
        </div>
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: 14,
              background: m.isDefault ? 'var(--green-bg)' : 'var(--bg-surface)',
              border: `${m.isDefault ? 2 : 1}px solid ${m.isDefault ? 'var(--green)' : 'var(--border)'}`,
              borderRadius: 'var(--r-lg)', cursor: 'pointer', textAlign: 'left',
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 'var(--r-sm)', background: 'var(--bg-surface)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              {m.type === 'mobile' ? <Smartphone size={18} color="var(--text-secondary)" /> : <Building2 size={18} color="var(--text-secondary)" />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{m.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{m.details}</div>
            </div>
            {m.isDefault && <CheckCircle2 size={18} color="var(--green)" />}
          </button>
        ))}
      </div>
    </Modal>
  )
}
