import { create } from 'zustand'
import type { Alert, AlertSeverity, AlertType } from '@/types'

interface AlertsState {
  alerts: Alert[]
  unreadCount: number
  filters: {
    severity: AlertSeverity | 'All'
    type: AlertType | 'All'
    acknowledged: 'all' | 'unacknowledged' | 'acknowledged'
  }
  setAlerts: (alerts: Alert[]) => void
  addAlert: (alert: Alert) => void
  acknowledgeAlert: (id: string, userId: string) => void
  setFilters: (filters: Partial<AlertsState['filters']>) => void
  getFilteredAlerts: () => Alert[]
}

export const useAlertsStore = create<AlertsState>((set, get) => ({
  alerts: [],
  unreadCount: 0,
  filters: {
    severity: 'All',
    type: 'All',
    acknowledged: 'all',
  },

  setAlerts: alerts => {
    const unreadCount = alerts.filter(a => !a.ackBy).length
    set({ alerts, unreadCount })
  },

  addAlert: alert => {
    set(state => ({
      alerts: [alert, ...state.alerts],
      unreadCount: state.unreadCount + 1,
    }))
  },

  acknowledgeAlert: (id, userId) => {
    set(state => ({
      alerts: state.alerts.map(alert =>
        alert.id === id ? { ...alert, ackBy: userId } : alert
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }))
  },

  setFilters: filters => {
    set(state => ({ filters: { ...state.filters, ...filters } }))
  },

  getFilteredAlerts: () => {
    const { alerts, filters } = get()
    return alerts.filter(alert => {
      const matchesSeverity = filters.severity === 'All' || alert.severity === filters.severity
      const matchesType = filters.type === 'All' || alert.type === filters.type
      const matchesAck =
        filters.acknowledged === 'all' ||
        (filters.acknowledged === 'unacknowledged' && !alert.ackBy) ||
        (filters.acknowledged === 'acknowledged' && alert.ackBy)

      return matchesSeverity && matchesType && matchesAck
    })
  },
}))
