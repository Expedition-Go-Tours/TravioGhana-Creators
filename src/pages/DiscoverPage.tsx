import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  Search,
  Star,
  MapPin,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Flame,
  Link2,
} from 'lucide-react'
import { useStore } from '../store/store'
import { ghs, formatNumber } from '../lib/format'
import EmptyState from '../components/ui/EmptyState'
import TourImage from '../components/ui/TourImage'

const CATEGORIES = ['All', 'Nature', 'Adventure', 'Culture', 'Beach', 'History']
const REGIONS = ['All Regions', 'Greater Accra', 'Central', 'Eastern', 'Ashanti', 'Western', 'Savannah', 'Volta']
const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'commission', label: 'Highest Commission' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
]

const stagger = { show: { transition: { staggerChildren: 0.04 } } }
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.3, 0.8, 0.4, 1] as const } },
}

export default function DiscoverPage() {
  const { state } = useStore()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const [category, setCategory] = useState('All')
  const [region, setRegion] = useState('All Regions')
  const [sort, setSort] = useState('popular')
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [page, setPage] = useState(1)
  const perPage = 8

  // Keep search in sync when arriving from the topbar search box
  useEffect(() => {
    const q = searchParams.get('q')
    if (q !== null && q !== search) {
      setSearch(q)
      setPage(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const updateSearch = (value: string) => {
    setSearch(value)
    setPage(1)
    if (value.trim()) setSearchParams({ q: value }, { replace: true })
    else setSearchParams({}, { replace: true })
  }

  const filtered = useMemo(() => {
    let result = [...state.tours]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (t) => t.title.toLowerCase().includes(q) || t.region.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      )
    }
    if (category !== 'All') result = result.filter((t) => t.category === category)
    if (region !== 'All Regions') result = result.filter((t) => t.region === region)
    switch (sort) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'commission': result.sort((a, b) => b.commissionRate - a.commissionRate || b.price - a.price); break
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'newest': result.sort((a, b) => (a.addedAt < b.addedAt ? 1 : -1)); break
      default: result.sort((a, b) => b.popularity - a.popularity)
    }
    return result
  }, [state.tours, search, category, region, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * perPage, safePage * perPage)

  const resetFilters = () => {
    setSearch('')
    setSearchParams({}, { replace: true })
    setCategory('All')
    setRegion('All Regions')
    setSort('popular')
    setPage(1)
  }

  const paginationFooter = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 24px', borderTop: '1px solid var(--border-soft)', flexWrap: 'wrap' }}>
      <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
        {filtered.length === 0 ? 'No results' : `Showing ${(safePage - 1) * perPage + 1}–${Math.min(safePage * perPage, filtered.length)} of ${filtered.length}`}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPage(Math.max(1, safePage - 1))} disabled={safePage === 1}>
          <ChevronLeft size={14} /> Prev
        </button>
        {view === 'list' &&
          Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              style={{
                width: 32, height: 32, borderRadius: 'var(--r-sm)', fontSize: 12, fontWeight: 700,
                background: safePage === p ? 'var(--green)' : 'var(--bg-paper)',
                color: safePage === p ? '#fff' : 'var(--text-secondary)',
                border: '1px solid ' + (safePage === p ? 'var(--green)' : 'var(--border)'),
                cursor: 'pointer',
              }}
            >
              {p}
            </button>
          ))}
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPage(Math.min(totalPages, safePage + 1))} disabled={safePage === totalPages}>
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* ── Header ── */}
      <motion.div variants={item} className="page-header">
        <div>
          <h1>Discover Experiences</h1>
          <p>Browse {state.tours.length} eligible tours and generate referral links.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className={`btn btn-sm ${view === 'list' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('list')} aria-label="List view">
            <List size={16} />
          </button>
          <button type="button" className={`btn btn-sm ${view === 'grid' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('grid')} aria-label="Grid view">
            <LayoutGrid size={16} />
          </button>
        </div>
      </motion.div>

      {/* ── Filters bar ── */}
      <motion.div variants={item} className="card card-flat" style={{ padding: '16px 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 240px', position: 'relative', maxWidth: 360 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input
              type="search"
              className="input"
              placeholder="Search tours, destinations..."
              value={search}
              onChange={(e) => updateSearch(e.target.value)}
              style={{ paddingLeft: 38, height: 40 }}
            />
          </div>

          <select className="select" value={region} onChange={(e) => { setRegion(e.target.value); setPage(1) }} style={{ height: 40, borderRadius: 'var(--r-md)' }} aria-label="Region">
            {REGIONS.map((r) => <option key={r}>{r}</option>)}
          </select>

          <select className="select" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1) }} style={{ height: 40, borderRadius: 'var(--r-md)' }} aria-label="Sort">
            {SORT_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>

          <div style={{ flex: 1 }} />

          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>
            {filtered.length} tour{filtered.length === 1 ? '' : 's'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 6, marginTop: 12, overflowX: 'auto', paddingBottom: 2 }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => { setCategory(c); setPage(1) }}
              style={{
                padding: '6px 14px', borderRadius: 'var(--r-pill)', fontSize: 12, fontWeight: 700,
                fontFamily: 'var(--font-display)',
                background: category === c ? 'var(--green)' : 'var(--bg-paper)',
                color: category === c ? '#fff' : 'var(--text-secondary)',
                border: '1px solid ' + (category === c ? 'var(--green)' : 'var(--border)'),
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </motion.div>

      {filtered.length === 0 ? (
        <motion.div variants={item} className="card card-flat">
          <EmptyState
            icon={<Search size={40} color="var(--text-tertiary)" />}
            title="No tours found"
            description="Try adjusting your search or filters."
            action={<button type="button" className="btn btn-secondary btn-sm" onClick={resetFilters}>Clear filters</button>}
          />
        </motion.div>
      ) : view === 'list' ? (
        <motion.div variants={item} className="card card-flat" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-scroll">
            <table className="table table-card">
              <thead>
                <tr>
                  <th style={{ width: 400 }}>Tour</th>
                  <th>Region</th>
                  <th>Rating</th>
                  <th>Bookings</th>
                  <th>Price</th>
                  <th>Commission</th>
                  <th style={{ width: 100, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((tour) => (
                  <tr key={tour.id}>
                    <td data-label="Tour">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <TourImage src={tour.image} alt={tour.title} style={{ width: 56, height: 42, borderRadius: 'var(--r-sm)', objectFit: 'cover', flexShrink: 0 }} />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 220 }}>
                              {tour.title}
                            </span>
                            {tour.trending && (
                              <span className="pill pill-info" style={{ fontSize: 9 }}>
                                <Flame size={9} /> HOT
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{tour.category}</div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Region">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)' }}>
                        <MapPin size={12} /> {tour.region}
                      </div>
                    </td>
                    <td data-label="Rating">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Star size={13} fill="var(--orange)" color="var(--orange)" />
                        <span style={{ fontWeight: 700, fontSize: 13 }}>{tour.rating}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>({tour.reviews})</span>
                      </div>
                    </td>
                    <td data-label="Bookings">
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13 }}>{formatNumber(tour.popularity)}</div>
                    </td>
                    <td data-label="Price">
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13 }}>{ghs(tour.price)}</div>
                    </td>
                    <td data-label="Commission">
                      <span className="pill pill-success">{tour.commissionRate}%</span>
                    </td>
                    <td data-label="" style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ padding: '6px 12px' }}
                        onClick={() => navigate(`/creator/links?tour=${tour.id}`)}
                      >
                        <Link2 size={13} /> Get Link
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {paginationFooter}
        </motion.div>
      ) : (
        <motion.div variants={item}>
          <div className="tour-grid">
            {paginated.map((tour) => (
              <div key={tour.id} className="card card-flat" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ position: 'relative' }}>
                  <TourImage src={tour.image} alt={tour.title} className="tour-card-img" />
                  {tour.trending && (
                    <span style={{ position: 'absolute', top: 10, left: 10, display: 'flex', alignItems: 'center', gap: 3, padding: '3px 8px', borderRadius: 'var(--r-pill)', background: 'var(--orange)', color: '#fff', fontSize: 10, fontWeight: 800 }}>
                      <Flame size={10} /> HOT
                    </span>
                  )}
                </div>
                <div style={{ padding: '16px 18px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 4 }}>
                    <MapPin size={11} /> {tour.region}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{tour.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Star size={12} fill="var(--orange)" color="var(--orange)" />
                      <span style={{ fontSize: 12, fontWeight: 700 }}>{tour.rating}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{formatNumber(tour.popularity)} bookings</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: 'var(--green)' }}>{tour.commissionRate}%</div>
                  </div>
                  <button type="button" className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => navigate(`/creator/links?tour=${tour.id}`)}>
                    <Link2 size={14} /> Get Link
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="card card-flat" style={{ padding: 0, marginTop: 20 }}>{paginationFooter}</div>
        </motion.div>
      )}
    </motion.div>
  )
}
