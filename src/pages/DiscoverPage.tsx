import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
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

const TOURS = [
  { id: 1, title: 'Kakum Canopy Walkway', region: 'Central Region', category: 'Nature', rating: 4.8, reviews: 142, price: 450, commission: '15%', bookings: 847, image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=200&q=80', trending: true },
  { id: 2, title: 'Mole National Park Safari', region: 'Savannah Region', category: 'Wildlife', rating: 4.9, reviews: 98, price: 1200, commission: '15%', bookings: 623, image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=200&q=80', trending: true },
  { id: 3, title: 'Cape Coast & Elmina Castles', region: 'Central Region', category: 'Heritage', rating: 4.7, reviews: 216, price: 350, commission: '15%', bookings: 1204, image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=200&q=80', trending: false },
  { id: 4, title: 'Boti Falls & Aburi Gardens', region: 'Eastern Region', category: 'Nature', rating: 4.6, reviews: 87, price: 280, commission: '15%', bookings: 412, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80', trending: false },
  { id: 5, title: 'Kumasi Cultural Heritage', region: 'Ashanti Region', category: 'Culture', rating: 4.8, reviews: 134, price: 400, commission: '15%', bookings: 567, image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=200&q=80', trending: false },
  { id: 6, title: 'Nzulezo Stilt Village', region: 'Western Region', category: 'Culture', rating: 4.5, reviews: 64, price: 320, commission: '15%', bookings: 289, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80', trending: false },
  { id: 7, title: 'Ada Foah Beach Escape', region: 'Greater Accra', category: 'Beach', rating: 4.4, reviews: 52, price: 250, commission: '15%', bookings: 198, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80', trending: false },
  { id: 8, title: 'Aburi Botanical Gardens Tour', region: 'Eastern Region', category: 'Nature', rating: 4.3, reviews: 41, price: 180, commission: '15%', bookings: 156, image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=200&q=80', trending: false },
  { id: 9, title: 'Elmina Fishing Harbour', region: 'Central Region', category: 'Culture', rating: 4.2, reviews: 38, price: 200, commission: '15%', bookings: 134, image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=200&q=80', trending: false },
  { id: 10, title: 'Lake Bosomtwe Adventure', region: 'Ashanti Region', category: 'Adventure', rating: 4.6, reviews: 72, price: 380, commission: '15%', bookings: 321, image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=200&q=80', trending: false },
]

const CATEGORIES = ['All', 'Nature', 'Wildlife', 'Heritage', 'Culture', 'Beach', 'Adventure']
const REGIONS = ['All Regions', 'Greater Accra', 'Central', 'Eastern', 'Ashanti', 'Western', 'Savannah']
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
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [region, setRegion] = useState('All Regions')
  const [sort, setSort] = useState('popular')
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [page, setPage] = useState(1)
  const perPage = 8

  const filtered = useMemo(() => {
    let result = [...TOURS]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((t) => t.title.toLowerCase().includes(q) || t.region.toLowerCase().includes(q))
    }
    if (category !== 'All') result = result.filter((t) => t.category === category)
    if (region !== 'All Regions') result = result.filter((t) => t.region.includes(region))
    switch (sort) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'commission': result.sort((a, b) => b.price - a.price); break
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'newest': result.sort((a, b) => b.id - a.id); break
      default: result.sort((a, b) => b.bookings - a.bookings)
    }
    return result
  }, [search, category, region, sort])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* ── Header ── */}
      <motion.div variants={item} className="page-header">
        <div>
          <h1>Discover Experiences</h1>
          <p>Browse {TOURS.length}+ eligible tours and generate referral links.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className={`btn btn-sm ${view === 'list' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setView('list')}>
            <List size={16} />
          </button>
          <button type="button" className={`btn btn-sm ${view === 'grid' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setView('grid')}>
            <LayoutGrid size={16} />
          </button>
        </div>
      </motion.div>

      {/* ── Filters bar ── */}
      <motion.div variants={item} className="card" style={{ padding: '16px 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ flex: '1 1 240px', position: 'relative', maxWidth: 360 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input
              type="search"
              className="input"
              placeholder="Search tours, destinations..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              style={{ paddingLeft: 38, height: 40 }}
            />
          </div>

          {/* Region select */}
          <select className="select" value={region} onChange={(e) => { setRegion(e.target.value); setPage(1) }} style={{ height: 40, borderRadius: 'var(--r-md)' }}>
            {REGIONS.map((r) => <option key={r}>{r}</option>)}
          </select>

          {/* Sort select */}
          <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} style={{ height: 40, borderRadius: 'var(--r-md)' }}>
            {SORT_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>

          <div style={{ flex: 1 }} />

          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>
            {filtered.length} tours
          </span>
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 6, marginTop: 12, overflowX: 'auto', paddingBottom: 2 }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => { setCategory(c); setPage(1) }}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--r-pill)',
                fontSize: 12,
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                background: category === c ? 'var(--green)' : 'var(--bg-paper)',
                color: category === c ? '#fff' : 'var(--text-secondary)',
                border: '1px solid ' + (category === c ? 'var(--green)' : 'var(--border)'),
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Table view (default — handles 1000+ tours) ── */}
      {view === 'list' && (
        <motion.div variants={item} className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="table">
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
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img
                        src={tour.image}
                        alt={tour.title}
                        style={{ width: 56, height: 42, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                        loading="lazy"
                      />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 220 }}>
                            {tour.title}
                          </span>
                          {tour.trending && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, padding: '1px 6px', borderRadius: 'var(--r-pill)', background: 'var(--orange-bg)', color: 'var(--orange)', fontSize: 9, fontWeight: 800 }}>
                              <Flame size={9} /> HOT
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{tour.category}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)' }}>
                      <MapPin size={12} /> {tour.region}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={13} fill="var(--orange)" color="var(--orange)" />
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{tour.rating}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>({tour.reviews})</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13 }}>{tour.bookings.toLocaleString()}</div>
                  </td>
                  <td>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13 }}>GHS {tour.price}</div>
                  </td>
                  <td>
                    <span className="pill pill-success">{tour.commission}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button type="button" className="btn btn-primary btn-sm" style={{ padding: '6px 12px' }}>
                      <Link2 size={13} /> Get Link
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderTop: '1px solid var(--border-soft)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
              Showing {((page - 1) * perPage) + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
                <ChevronLeft size={14} /> Prev
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 'var(--r-sm)',
                    fontSize: 12,
                    fontWeight: 700,
                    background: page === p ? 'var(--green)' : 'var(--bg-paper)',
                    color: page === p ? '#fff' : 'var(--text-secondary)',
                    border: '1px solid ' + (page === p ? 'var(--green)' : 'var(--border)'),
                    cursor: 'pointer',
                  }}
                >
                  {p}
                </button>
              ))}
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Grid view (optional) ── */}
      {view === 'grid' && (
        <motion.div variants={item}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {paginated.map((tour) => (
              <div key={tour.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ position: 'relative' }}>
                  <img src={tour.image} alt={tour.title} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover' }} loading="lazy" />
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
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{tour.bookings} bookings</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: 'var(--green)' }}>{tour.commission}</div>
                  </div>
                  <button type="button" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                    <Link2 size={14} /> Get Link
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination for grid */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
              Showing {((page - 1) * perPage) + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
                <ChevronLeft size={14} /> Prev
              </button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <motion.div variants={item} className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <Search size={40} color="var(--text-tertiary)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No tours found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Try adjusting your search or filters.</p>
        </motion.div>
      )}
    </motion.div>
  )
}
