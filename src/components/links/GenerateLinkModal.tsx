import { useEffect, useMemo, useState } from 'react'
import { Link2, Sparkles, Wand2 } from 'lucide-react'
import { toast } from 'sonner'
import Modal from '../ui/Modal'
import { Field } from '../ui/Field'
import TourImage from '../ui/TourImage'
import { useStore } from '../../store/store'
import { ghs } from '../../lib/format'
import { buildLinkUrl, makeLink, uniqueReferralCode } from '../../lib/linkgen'
import type { ReferralLink } from '../../store/types'

interface Props {
  open: boolean
  onClose: () => void
  defaultTourId?: string
  onCreated?: (link: ReferralLink) => void
}

const CAMPAIGN_SUGGESTIONS = ['Instagram Reels', 'TikTok', 'YouTube', 'Newsletter', 'WhatsApp Status', 'General']

export default function GenerateLinkModal({ open, onClose, defaultTourId, onCreated }: Props) {
  const { state, dispatch } = useStore()
  const { tours, links, profile } = state

  const [tourId, setTourId] = useState(defaultTourId ?? tours[0]?.id ?? '')
  const [campaign, setCampaign] = useState('General')
  const [saving, setSaving] = useState(false)
  const [code, setCode] = useState('')

  const handle = profile.referralCode.split('-')[1] ?? 'AMA'

  // Reset the form each time the modal opens (honour a pre-selected tour and
  // pre-generate the code so the preview shows the exact link that will be made).
  useEffect(() => {
    if (!open) return
    setTourId(defaultTourId && tours.some((t) => t.id === defaultTourId) ? defaultTourId : tours[0]?.id ?? '')
    setCampaign('General')
    setSaving(false)
    setCode(uniqueReferralCode(links.map((l) => l.code), handle))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, defaultTourId, tours])

  const tour = useMemo(() => tours.find((t) => t.id === tourId), [tours, tourId])

  const existingCodes = useMemo(() => links.map((l) => l.code), [links])

  const previewCode = code || `TRV-${handle}-••••`
  const previewUrl = tour ? buildLinkUrl(tour, previewCode) : ''

  const alreadyLinked = tour ? links.some((l) => l.tourId === tour.id) : false

  const handleGenerate = () => {
    if (!tour) {
      toast.error('Choose a tour to promote')
      return
    }
    setSaving(true)
    const finalCode = existingCodes.includes(code) ? uniqueReferralCode(existingCodes, handle) : code || uniqueReferralCode(existingCodes, handle)
    const link = makeLink(tour, campaign, links.length, finalCode, new Date().toISOString().slice(0, 10))
    dispatch({ type: 'link/add', link })
    toast.success('Referral link generated', { description: link.code })
    setSaving(false)
    onClose()
    onCreated?.(link)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Generate New Link"
      footer={
        <>
          <button className="btn btn-secondary btn-sm" onClick={onClose} type="button">Cancel</button>
          <button className="btn btn-primary btn-sm" onClick={handleGenerate} type="button" disabled={saving || !tour}>
            <Sparkles size={14} /> Generate Link
          </button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="Tour to promote" hint={alreadyLinked ? 'You already have a link for this tour — you can still make another for a different campaign.' : undefined}>
          <select className="select" value={tourId} onChange={(e) => setTourId(e.target.value)}>
            {tours.map((t) => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
        </Field>

        {tour && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12, background: 'var(--bg-hover)', borderRadius: 'var(--r-lg)' }}>
            <TourImage
              src={tour.image}
              alt={tour.title}
              style={{ width: 56, height: 56, borderRadius: 'var(--r-md)', objectFit: 'cover', flexShrink: 0 }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14 }}>{tour.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {tour.region} · {ghs(tour.price)} · {tour.commissionRate}% commission
              </div>
            </div>
          </div>
        )}

        <Field label="Campaign name" hint="Helps you tell your links apart in reporting">
          <input
            className="input"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            placeholder="e.g. Instagram Reels"
            list="campaign-suggestions"
          />
          <datalist id="campaign-suggestions">
            {CAMPAIGN_SUGGESTIONS.map((c) => <option key={c} value={c} />)}
          </datalist>
        </Field>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CAMPAIGN_SUGGESTIONS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCampaign(c)}
              className={`pill ${campaign === c ? 'pill-success' : 'pill-neutral'}`}
              style={{ cursor: 'pointer', border: 'none' }}
            >
              {c}
            </button>
          ))}
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 6 }}>
            Link preview
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
            background: 'var(--bg-paper)', border: '1px dashed var(--border)', borderRadius: 'var(--r-md)',
          }}>
            <Wand2 size={15} color="var(--green)" style={{ flexShrink: 0 }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {previewUrl}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 11, color: 'var(--text-tertiary)' }}>
            <Link2 size={12} /> Your referral code will be <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{previewCode}</strong>
          </div>
        </div>
      </div>
    </Modal>
  )
}
