import { Share2, MessageCircle, Twitter, Facebook, Mail, Smartphone } from 'lucide-react'
import { toast } from 'sonner'
import Drawer from '../ui/Drawer'
import CopyButton from '../ui/CopyButton'
import { copyText } from '../../lib/clipboard'

interface Props {
  open: boolean
  onClose: () => void
  url: string
  code: string
  title: string
  campaign?: string
}

export default function ShareDrawer({ open, onClose, url, code, title, campaign }: Props) {
  const text = `Check out ${title} on Travio Ghana 🌍`
  const enc = encodeURIComponent
  const canNativeShare = typeof navigator !== 'undefined' && 'share' in navigator

  const targets = [
    { label: 'WhatsApp', icon: MessageCircle, color: '#25D366', href: `https://wa.me/?text=${enc(`${text} ${url}`)}` },
    { label: 'X / Twitter', icon: Twitter, color: '#15201d', href: `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}` },
    { label: 'Facebook', icon: Facebook, color: '#1877F2', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: 'Email', icon: Mail, color: '#6b7280', href: `mailto:?subject=${enc(title)}&body=${enc(`${text}\n\n${url}`)}` },
  ]

  const nativeShare = async () => {
    if (canNativeShare) {
      try {
        await navigator.share({ title, text, url })
        onClose()
      } catch {
        /* user cancelled — no-op */
      }
    } else {
      const ok = await copyText(url)
      if (ok) toast.success('Link copied to clipboard')
      else toast.error('Could not share — copy the link manually')
    }
  }

  return (
    <Drawer open={open} onClose={onClose} title="Share Link">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>{title}</div>
          {campaign && <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{campaign} campaign</div>}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
          background: 'var(--bg-paper)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
        }}>
          <div style={{ flex: 1, minWidth: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {url}
          </div>
          <CopyButton text={url} iconOnly label="Copy" />
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 10 }}>
            Share to
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {targets.map((t) => (
              <a
                key={t.label}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                  border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
                  background: 'var(--bg-surface)', color: 'var(--text-primary)',
                  textDecoration: 'none', fontSize: 13, fontWeight: 600,
                }}
              >
                <t.icon size={18} color={t.color} /> {t.label}
              </a>
            ))}
          </div>
        </div>

        <button type="button" className="btn btn-primary" onClick={nativeShare}>
          {canNativeShare ? <Share2 size={16} /> : <Smartphone size={16} />}
          {canNativeShare ? 'Share via device' : 'Copy link'}
        </button>

        <div>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 10 }}>
            Referral code
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '10px 12px', background: 'var(--green-bg)', borderRadius: 'var(--r-md)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, color: 'var(--green-dark)' }}>{code}</span>
            <CopyButton text={code} iconOnly label="Copy" />
          </div>
        </div>
      </div>
    </Drawer>
  )
}
