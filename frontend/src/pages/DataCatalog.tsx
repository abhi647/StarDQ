import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDatasetsStore } from '@/stores'
import { BadgePill, HealthDot } from '@/components/atoms'
import {
  Search,
  Filter,
  Database,
  Grid3x3,
  List,
  SortAsc,
  SortDesc,
  Plus,
  TrendingUp,
  Calendar,
  BarChart3,
  Download
} from 'lucide-react'
import type { Badge } from '@/types'

type ViewMode = 'grid' | 'list'
type SortBy = 'name' | 'quality' | 'modified' | 'rows'
type SortOrder = 'asc' | 'desc'

export function DataCatalog() {
  const { datasets, filteredDatasets, setFilters } = useDatasetsStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBadges, setSelectedBadges] = useState<Badge[]>([])
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortBy>('modified')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique domains
  const domains = useMemo(() => {
    return Array.from(new Set(datasets.map(d => d.domain)))
  }, [datasets])

  // Filter and sort datasets
  const displayDatasets = useMemo(() => {
    let filtered = datasets

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        d =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.domain.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Badge filter
    if (selectedBadges.length > 0) {
      filtered = filtered.filter(d => selectedBadges.includes(d.badge))
    }

    // Domain filter
    if (selectedDomains.length > 0) {
      filtered = filtered.filter(d => selectedDomains.includes(d.domain))
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'quality':
          comparison = a.qualityScore - b.qualityScore
          break
        case 'modified':
          comparison = new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()
          break
        case 'rows':
          comparison = a.profile.totalRows - b.profile.totalRows
          break
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [datasets, searchQuery, selectedBadges, selectedDomains, sortBy, sortOrder])

  const toggleBadge = (badge: Badge) => {
    setSelectedBadges(prev =>
      prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]
    )
  }

  const toggleDomain = (domain: string) => {
    setSelectedDomains(prev =>
      prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]
    )
  }

  const toggleSort = (field: SortBy) => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#F8F9FA',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#012F35',
              marginBottom: '8px',
              fontFamily: 'Bw Gradual, Segoe UI, system-ui, sans-serif'
            }}>
              Data Catalog
            </h1>
            <p style={{ fontSize: '16px', color: '#64748B' }}>
              Browse and manage {datasets.length} datasets across your organization
            </p>
          </div>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: '#007787',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00B3CA'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007787'}
          >
            <Plus size={18} />
            Connect Data Source
          </button>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[
            { label: 'Total Datasets', value: datasets.length, icon: Database, color: '#00B3CA' },
            { label: 'Gold Standard', value: datasets.filter(d => d.badge === 'Gold').length, icon: TrendingUp, color: '#FFD700' },
            { label: 'Avg Quality', value: `${Math.round((datasets.reduce((acc, d) => acc + d.qualityScore, 0) / datasets.length) * 100)}%`, icon: BarChart3, color: '#10b981' },
            { label: 'Updated Today', value: datasets.filter(d => new Date(d.lastModified).toDateString() === new Date().toDateString()).length, icon: Calendar, color: '#007787' }
          ].map((stat, idx) => (
            <div key={idx} style={{
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                backgroundColor: `${stat.color}20`,
                padding: '10px',
                borderRadius: '8px'
              }}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#012F35' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Controls */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #E2E8F0'
        }}>
          {/* Search Bar */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: showFilters ? '20px' : '0' }}>
            <div style={{
              flex: 1,
              position: 'relative'
            }}>
              <Search size={18} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748B'
              }} />
              <input
                type="text"
                placeholder="Search datasets by name or domain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 44px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#00B3CA'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: showFilters ? '#E7F9F5' : 'white',
                border: `1px solid ${showFilters ? '#00B3CA' : '#E2E8F0'}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: showFilters ? '#007787' : '#64748B',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Filter size={18} />
              Filters
              {(selectedBadges.length + selectedDomains.length) > 0 && (
                <span style={{
                  backgroundColor: '#007787',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  {selectedBadges.length + selectedDomains.length}
                </span>
              )}
            </button>

            {/* View Mode Toggle */}
            <div style={{
              display: 'flex',
              backgroundColor: '#F8F9FA',
              borderRadius: '8px',
              padding: '4px',
              border: '1px solid #E2E8F0'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '8px 12px',
                  backgroundColor: viewMode === 'grid' ? 'white' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  color: viewMode === 'grid' ? '#007787' : '#64748B',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '8px 12px',
                  backgroundColor: viewMode === 'list' ? 'white' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  color: viewMode === 'list' ? '#007787' : '#64748B',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <List size={18} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-') as [SortBy, SortOrder]
                setSortBy(field)
                setSortOrder(order)
              }}
              style={{
                padding: '12px 16px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#012F35',
                backgroundColor: 'white',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="modified-desc">Recently Updated</option>
              <option value="modified-asc">Oldest First</option>
              <option value="quality-desc">Quality: High to Low</option>
              <option value="quality-asc">Quality: Low to High</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="rows-desc">Size: Largest First</option>
              <option value="rows-asc">Size: Smallest First</option>
            </select>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div style={{
              paddingTop: '20px',
              borderTop: '1px solid #E2E8F0'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Badge Filter */}
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#012F35', marginBottom: '12px' }}>
                    Quality Badge
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {(['Gold', 'Silver', 'Bronze'] as Badge[]).map(badge => (
                      <button
                        key={badge}
                        onClick={() => toggleBadge(badge)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '20px',
                          border: `2px solid ${selectedBadges.includes(badge) ? '#007787' : '#E2E8F0'}`,
                          backgroundColor: selectedBadges.includes(badge) ? '#E7F9F5' : 'white',
                          fontSize: '13px',
                          fontWeight: '500',
                          color: selectedBadges.includes(badge) ? '#007787' : '#64748B',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {badge}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Domain Filter */}
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#012F35', marginBottom: '12px' }}>
                    Domain
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {domains.map(domain => (
                      <button
                        key={domain}
                        onClick={() => toggleDomain(domain)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '20px',
                          border: `2px solid ${selectedDomains.includes(domain) ? '#007787' : '#E2E8F0'}`,
                          backgroundColor: selectedDomains.includes(domain) ? '#E7F9F5' : 'white',
                          fontSize: '13px',
                          fontWeight: '500',
                          color: selectedDomains.includes(domain) ? '#007787' : '#64748B',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {domain}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedBadges.length + selectedDomains.length) > 0 && (
                <button
                  onClick={() => {
                    setSelectedBadges([])
                    setSelectedDomains([])
                    setSearchQuery('')
                  }}
                  style={{
                    marginTop: '16px',
                    padding: '8px 16px',
                    backgroundColor: 'transparent',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#64748B',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '14px', color: '#64748B' }}>
          Showing <strong style={{ color: '#012F35' }}>{displayDatasets.length}</strong> of <strong style={{ color: '#012F35' }}>{datasets.length}</strong> datasets
        </p>
      </div>

      {/* Dataset Display */}
      {displayDatasets.length > 0 ? (
        viewMode === 'grid' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '20px'
          }}>
            {displayDatasets.map(dataset => (
              <Link
                key={dataset.id}
                to={`/datasets/${dataset.id}`}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #E2E8F0',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'
                  e.currentTarget.style.borderColor = '#00B3CA'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = '#E2E8F0'
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <Database size={20} style={{ color: '#007787' }} />
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#012F35', margin: 0 }}>
                        {dataset.name}
                      </h3>
                    </div>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                      {dataset.domain}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BadgePill badge={dataset.badge} size="sm" />
                    <HealthDot status="healthy" size="sm" />
                  </div>
                </div>

                {/* Quality Score */}
                <div style={{
                  backgroundColor: '#F8F9FA',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#64748B' }}>Quality Score</span>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#007787' }}>
                      {Math.round(dataset.qualityScore * 100)}%
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: '#E2E8F0',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${dataset.qualityScore * 100}%`,
                      height: '100%',
                      backgroundColor: dataset.qualityScore >= 0.9 ? '#10b981' : dataset.qualityScore >= 0.75 ? '#FFA500' : '#ef4444',
                      transition: 'width 0.3s'
                    }} />
                  </div>
                </div>

                {/* Stats Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>Total Rows</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#012F35' }}>
                      {dataset.profile.totalRows.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>Columns</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#012F35' }}>
                      {dataset.profile.totalColumns}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>Completeness</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#012F35' }}>
                      {Math.round(dataset.profile.completeness * 100)}%
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>Validity</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#012F35' }}>
                      {Math.round(dataset.profile.validity * 100)}%
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{
                  paddingTop: '12px',
                  borderTop: '1px solid #E2E8F0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Updated {new Date(dataset.lastModified).toLocaleDateString()}
                  </div>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#F8F9FA',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#007787',
                    cursor: 'pointer'
                  }}>
                    View Details →
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {displayDatasets.map(dataset => (
              <Link
                key={dataset.id}
                to={`/datasets/${dataset.id}`}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  border: '1px solid #E2E8F0',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8F9FA'
                  e.currentTarget.style.borderColor = '#00B3CA'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white'
                  e.currentTarget.style.borderColor = '#E2E8F0'
                }}
              >
                <Database size={24} style={{ color: '#007787' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#012F35', marginBottom: '4px' }}>
                    {dataset.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>
                    {dataset.domain} • {dataset.profile.totalRows.toLocaleString()} rows • {dataset.profile.totalColumns} columns
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#007787' }}>
                      {Math.round(dataset.qualityScore * 100)}%
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Quality</div>
                  </div>
                  <BadgePill badge={dataset.badge} />
                  <HealthDot status="healthy" size="md" />
                </div>
              </Link>
            ))}
          </div>
        )
      ) : (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '64px',
          textAlign: 'center',
          border: '1px solid #E2E8F0'
        }}>
          <Database size={64} style={{ color: '#A8DCDB', margin: '0 auto 20px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#012F35', marginBottom: '8px' }}>
            No datasets found
          </h3>
          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px' }}>
            {searchQuery || selectedBadges.length > 0 || selectedDomains.length > 0
              ? 'Try adjusting your filters or search query'
              : 'Get started by connecting your first data source'}
          </p>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#007787',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            {searchQuery || selectedBadges.length > 0 || selectedDomains.length > 0
              ? 'Clear Filters'
              : 'Connect Data Source'}
          </button>
        </div>
      )}
    </div>
  )
}
