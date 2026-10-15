import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Download, QrCode as QrIcon } from 'lucide-react'
import { toast } from 'sonner'
import Modal from '../ui/Modal'

interface Props {
  open: boolean
  onClose: () => void
  url: string
  title: string
  code: string
}

export default function QrModal({ open, onClose, url, title, code }: Props) {
  const [dataUrl, setDataUrl] = useState('')

  useEffect(() => {
    if (!open) return
    let cancelled = false
    QRCode.toDataURL(url, {
      width: 512,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#15201d', light: '#ffffff' },
    })
      .then((d) => { if (!cancelled) setDataUrl(d) })
      .catch(() => { if (!cancelled) toast.error('Could not generate QR code') })
    return () => { cancelled = true }
  }, [open, url])

  const filename = `travio-${code}.png`

  const handleDownload = () => {
    if (!dataUrl) return
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    toast.success('QR code downloaded', { description: filename })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="QR Code"
      size="sm"
      footer={
        <>
          <button className="btn btn-secondary btn-sm" onClick={onClose} type="button">Close</button>
          <button className="btn btn-primary btn-sm" onClick={handleDownload} type="button" disabled={!dataUrl}>
            <Download size={14} /> Download PNG
          </button>
        </>
      }
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: 16 }}>{code}</div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 220, height: 220, background: '#fff', border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)', padding: 12,
        }}>
          {dataUrl
            ? <img src={dataUrl} alt={`QR code for ${title}`} style={{ width: '100%', height: '100%', display: 'block' }} />
            : <QrIcon size={40} color="var(--text-tertiary)" />}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 14, wordBreak: 'break-all', fontFamily: 'var(--font-mono)' }}>
          {url}
        </div>
      </div>
    </Modal>
  )
}
