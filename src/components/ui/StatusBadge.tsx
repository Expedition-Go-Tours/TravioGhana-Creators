import { CheckCircle2, Clock, XCircle, AlertCircle, RefreshCcw, Ban, PlayCircle } from 'lucide-react'

export type StatusVariant = 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'processing' | 'failed' | 'requested' | 'active' | 'disabled' | 'expired'

export default function StatusBadge({ status, className = '' }: { status: StatusVariant; className?: string }) {
  const map: Record<StatusVariant, { cls: string; label: string; Icon: any }> = {
    confirmed: { cls: 'pill-success', label: 'Confirmed', Icon: CheckCircle2 },
    pending: { cls: 'pill-warning', label: 'Pending', Icon: Clock },
    cancelled: { cls: 'pill-error', label: 'Cancelled', Icon: XCircle },
    completed: { cls: 'pill-success', label: 'Completed', Icon: CheckCircle2 },
    processing: { cls: 'pill-warning', label: 'Processing', Icon: RefreshCcw },
    failed: { cls: 'pill-error', label: 'Failed', Icon: XCircle },
    requested: { cls: 'pill-warning', label: 'Requested', Icon: AlertCircle },
    active: { cls: 'pill-success', label: 'Active', Icon: PlayCircle },
    disabled: { cls: 'pill-neutral', label: 'Disabled', Icon: Ban },
    expired: { cls: 'pill-error', label: 'Expired', Icon: AlertCircle }
  }
  const m = map[status]
  if (!m) return null
  return (
    <span className={`pill ${m.cls} ${className}`}>
      <m.Icon size={12} /> {m.label}
    </span>
  )
}