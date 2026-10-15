import type { ReactNode } from 'react'
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'

/**
 * Unified KPI anatomy: label → value → delta with explicit comparison period.
 * Use everywhere a headline number is shown so the comparison is never implicit.
 */
export default function Kpi({
  label,
  value,
  delta = null,
  period = 'vs last month',
  icon,
  tone = 'default'
}: {
  label: string
  value: ReactNode
  delta?: number | null
  period?: string
  icon?: ReactNode
  tone?: 'default' | 'green' | 'mint' | 'orange'
}) {
  const hasDelta = delta !== null && delta !== undefined
  const up = hasDelta && delta! > 0
  const flat = hasDelta && delta === 0
  const DeltaIcon = flat ? Minus : up ? ArrowUpRight : ArrowDownRight

  return (
    <div className={`kpi kpi--${tone}`}>
      <div className="kpi-top">
        <span className="kpi-label">{label}</span>
        {icon && <span className="kpi-icon">{icon}</span>}
      </div>
      <div className="kpi-value">{value}</div>
      {hasDelta ? (
        <div className={`kpi-delta ${flat ? 'is-flat' : up ? 'is-up' : 'is-down'}`}>
          <DeltaIcon size={12} />
          <span>{up ? '+' : ''}{delta!.toFixed(1)}%</span>
          <span className="kpi-delta-period">{period}</span>
        </div>
      ) : (
        <div className="kpi-delta is-flat">
          <span className="kpi-delta-period">{period}</span>
        </div>
      )}
    </div>
  )
}
