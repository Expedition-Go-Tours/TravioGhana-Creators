import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Drawer({ open, onClose, title, children, width = 360 }: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode; width?: number }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
          <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.3, ease: [0.3,0.8,0.4,1] }} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width, background: 'var(--bg-surface)', borderLeft: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column', zIndex: 1001 }}>
            {title && <div style={{ padding: 16, borderBottom: '1px solid var(--border-soft)', fontWeight: 700 }}>{title}</div>}
            <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}