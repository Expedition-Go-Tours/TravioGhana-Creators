export function ghs(amount: number, decimals = 0): string {
  if (decimals === 0) {
    return `GHS ${amount.toLocaleString()}`
  }
  return `GHS ${amount.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
}

export function formatNumber(n: number): string {
  return n.toLocaleString()
}

export function formatDate(dateStr: string): string {
  // accept YYYY-MM-DD or ISO
  const d = new Date(dateStr.includes('T') ? dateStr : `${dateStr}T00:00:00`)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function relativeTime(dateStr: string, now: Date = new Date()): string {
  // seed uses dates like 2026-05-04 etc
  const d = new Date(dateStr.includes('T') ? dateStr : `${dateStr}T12:00:00`)
  const diff = Math.floor((now.getTime() - d.getTime()) / 3600000)
  if (diff < 0) return dateStr
  if (diff < 1) return 'Just now'
  if (diff < 24) return `${diff} hr${diff === 1 ? '' : 's'} ago`
  const days = Math.floor(diff / 24)
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

export function downloadCsv(filename: string, rows: Array<Record<string, any>>, columns: string[]) {
  const headers = columns.join(',')
  const data = rows.map((r) => columns.map((c) => {
    const v = r[c]
    if (v === null || v === undefined) return ''
    const s = String(v)
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"'
    return s
  }).join(',')).join('\n')
  const blob = new Blob([headers + '\n' + data], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}