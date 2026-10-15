export default function Skeleton({ width = '100%', height = 20 }: { width?: string | number; height?: string | number }) {
  return <div className="skeleton" style={{ width, height }} />
}