import { useEffect, useState } from 'react'
import { Wallet, AlertCircle, Banknote, Smartphone } from 'lucide-react'
import { toast } from 'sonner'
import Modal from '../ui/Modal'
import { Field } from '../ui/Field'
import { ghs } from '../../lib/format'
import type { PayoutMethod } from '../../store/types'

interface Props {
  open: boolean
  onClose: () => void
  available: number
  minPayout: number
  currency: string
  method?: PayoutMethod
  onConfirm: (amount: number) => void
}

export default function RequestPayoutModal({ open, onClose, available, minPayout, currency, method, onConfirm }: Props) {
  const [amount, setAmount] = useState('')
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (open) {
      setAmount('')
      setTouched(false)
    }
  }, [open])

  const numeric = Number(amount.replace(/[^0-9.]/g, ''))
  const belowMin = numeric > 0 && numeric < minPayout
  const aboveAvail = numeric > available
  const canSubmit = amount.trim() !== '' && !isNaN(numeric) && numeric > 0 && !belowMin && !aboveAvail

  const error =
    touched && amount !== ''
      ? belowMin
        ? `Minimum payout is ${ghs(minPayout)}`
        : aboveAvail
          ? `You can withdraw at most ${ghs(available)}`
          : numeric <= 0
            ? 'Enter an amount'
            : undefined
      : undefined

  const submit = () => {
    if (!canSubmit) {
      setTouched(true)
      if (numeric <= 0 || isNaN(numeric)) toast.error('Enter a valid amount')
      return
    }
    onConfirm(numeric)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Request Payout"
      size="sm"
      footer={
        <>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary btn-sm" onClick={submit} disabled={!canSubmit}>
            <Banknote size={14} /> Request payout
          </button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'var(--green-bg)', border: '1px solid #cae3d3', borderRadius: 'var(--r-md)' }}>
          <Wallet size={18} color="var(--green)" />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18 }}>{ghs(available)}</div>
            <div style={{ fontSize: 11, color: 'var(--green-dark)' }}>available to withdraw</div>
          </div>
        </div>

        <Field label="Amount" hint={`Minimum ${ghs(minPayout)} · currency ${currency}`} error={error}>
          <input
            className="input"
            inputMode="numeric"
            value={amount}
            placeholder={String(minPayout)}
            onChange={(e) => { setAmount(e.target.value.replace(/[^0-9.]/g, '')) }}
            onBlur={() => setTouched(true)}
            autoFocus
          />
        </Field>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button
            type="button"
            className="pill pill-neutral"
            style={{ cursor: 'pointer', border: 'none' }}
            onClick={() => setAmount(String(minPayout))}
          >
            Min {ghs(minPayout)}
          </button>
          <button
            type="button"
            className="pill pill-success"
            style={{ cursor: 'pointer', border: 'none' }}
            onClick={() => setAmount(String(Math.floor(available)))}
          >
            All {ghs(Math.floor(available))}
          </button>
        </div>

        {method && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'var(--bg-paper)', borderRadius: 'var(--r-md)' }}>
            {method.type === 'mobile'
              ? <Smartphone size={16} color="var(--text-secondary)" />
              : <Banknote size={16} color="var(--text-secondary)" />}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{method.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{method.details}</div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text-tertiary)' }}>
          <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>Requested funds move to “Processing” straight away and are held until the transfer completes.</span>
        </div>
      </div>
    </Modal>
  )
}
