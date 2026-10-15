import Modal from './Modal'

export default function ConfirmDialog({ open, onClose, title = 'Confirm', message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, danger = false }: { open: boolean; onClose: () => void; title?: string; message: string; confirmText?: string; cancelText?: string; onConfirm: () => void; danger?: boolean }) {
  const footer = (
    <>
      <button className="btn btn-secondary btn-sm" onClick={onClose}>{cancelText}</button>
      <button className={danger ? 'btn btn-danger btn-sm' : 'btn btn-primary btn-sm'} onClick={onConfirm}>{confirmText}</button>
    </>
  )
  return (
    <Modal open={open} onClose={onClose} title={title} footer={footer} size="sm">
      <div style={{ color: 'var(--text-secondary)' }}>{message}</div>
    </Modal>
  )
}