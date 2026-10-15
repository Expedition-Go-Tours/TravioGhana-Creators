import { useState } from 'react'
import { Copy, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

export default function CopyButton({ text, label = 'Copy', iconOnly = false }: { text: string; label?: string; iconOnly?: boolean }) {
  const [copied, setCopied] = useState(false)
  const handle = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Copied')
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      toast.error('Failed to copy')
    }
  }
  return (
    <motion.button whileTap={{ scale: 0.92 }} type="button" onClick={handle} className={iconOnly ? 'btn btn-ghost btn-sm' : 'btn btn-primary btn-sm'}>
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span key="c" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <CheckCircle2 size={12} /> Copied
          </motion.span>
        ) : (
          <motion.span key="d" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Copy size={12} /> {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}