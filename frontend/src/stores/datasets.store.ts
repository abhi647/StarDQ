import { create } from 'zustand'
import type { Dataset, Domain, Badge } from '@/types'

interface DatasetsState {
  datasets: Dataset[]
  selectedDataset: Dataset | null
  filters: {
    domain: Domain | 'All'
    badge: Badge | 'All'
    search: string
  }
  setDatasets: (datasets: Dataset[]) => void
  addDataset: (dataset: Dataset) => void
  updateDataset: (id: string, updates: Partial<Dataset>) => void
  selectDataset: (id: string | null) => void
  setFilters: (filters: Partial<DatasetsState['filters']>) => void
  getFilteredDatasets: () => Dataset[]
}

export const useDatasetsStore = create<DatasetsState>((set, get) => ({
  datasets: [],
  selectedDataset: null,
  filters: {
    domain: 'All',
    badge: 'All',
    search: '',
  },

  setDatasets: datasets => {
    set({ datasets })
  },

  addDataset: dataset => {
    set(state => ({ datasets: [...state.datasets, dataset] }))
  },

  updateDataset: (id, updates) => {
    set(state => ({
      datasets: state.datasets.map(ds => (ds.id === id ? { ...ds, ...updates } : ds)),
      selectedDataset:
        state.selectedDataset?.id === id
          ? { ...state.selectedDataset, ...updates }
          : state.selectedDataset,
    }))
  },

  selectDataset: id => {
    const dataset = id ? get().datasets.find(ds => ds.id === id) || null : null
    set({ selectedDataset: dataset })
  },

  setFilters: filters => {
    set(state => ({ filters: { ...state.filters, ...filters } }))
  },

  getFilteredDatasets: () => {
    const { datasets, filters } = get()
    return datasets.filter(ds => {
      const matchesDomain = filters.domain === 'All' || ds.domain === filters.domain
      const matchesBadge = filters.badge === 'All' || ds.badge === filters.badge
      const matchesSearch =
        !filters.search ||
        ds.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        ds.domain.toLowerCase().includes(filters.search.toLowerCase())

      return matchesDomain && matchesBadge && matchesSearch
    })
  },
}))
