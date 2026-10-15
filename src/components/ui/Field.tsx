import type { ReactNode } from 'react'

export function Field({ label, children, hint, error }: { label: string; children: ReactNode; hint?: string; error?: string }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      {children}
      {hint && <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{hint}</div>}
      {error && <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 2 }}>{error}</div>}
    </div>
  )
}

export function TextField({ label, value, onChange, placeholder, type = 'text', hint, error, name }: any) {
  return (
    <Field label={label} hint={hint} error={error}>
      <input className="input" name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </Field>
  )
}

export function SelectField({ label, value, onChange, options, hint, error }: any) {
  return (
    <Field label={label} hint={hint} error={error}>
      <select className="select" value={value} onChange={onChange}>
        {options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Field>
  )
}