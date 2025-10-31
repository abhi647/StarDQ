import type { User, Dataset, Alert } from '@/types'

/**
 * Seed data for development and testing
 */

export const seedUsers: User[] = [
  {
    id: '1',
    email: 'meera@example.com',
    name: 'Meera Patel',
    role: 'it_admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'ravi@example.com',
    name: 'Ravi Kumar',
    role: 'data_steward',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'asha@example.com',
    name: 'Asha Sharma',
    role: 'business_analyst',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    email: 'vikram@example.com',
    name: 'Vikram Singh',
    role: 'exec',
    createdAt: new Date().toISOString(),
  },
]

export const seedDatasets: Dataset[] = [
  {
    id: 'ds-1',
    name: 'Customer Master',
    domain: 'Sales',
    schema: {},
    profile: {
      totalRows: 10000,
      totalColumns: 15,
      nullRate: { email: 0.08, phone: 0.05 },
      dupRate: 0.12,
      outliers: ['age', 'revenue'],
      patterns: { email: 'email', phone: 'phone' },
    },
    badge: 'Silver',
    owner: '2',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ds-2',
    name: 'Leads Q4',
    domain: 'Marketing',
    schema: {},
    profile: {
      totalRows: 25000,
      totalColumns: 20,
      nullRate: { phone: 0.15, company: 0.1 },
      dupRate: 0.2,
      outliers: ['score'],
      patterns: { email: 'email', company: 'text' },
    },
    badge: 'Bronze',
    owner: '3',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ds-3',
    name: 'Financial Transactions',
    domain: 'Finance',
    schema: {},
    profile: {
      totalRows: 50000,
      totalColumns: 12,
      nullRate: { description: 0.02 },
      dupRate: 0.01,
      outliers: [],
      patterns: { amount: 'number', date: 'date' },
    },
    badge: 'Gold',
    owner: '2',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const seedAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'pii_violation',
    severity: 'high',
    datasetId: 'ds-2',
    message: 'PII data detected in Leads Q4 dataset without proper masking',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'alert-2',
    type: 'uniqueness_drop',
    severity: 'medium',
    datasetId: 'ds-1',
    message: 'Duplicate rate increased from 10% to 12% in Customer Master',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'alert-3',
    type: 'freshness_drop',
    severity: 'low',
    datasetId: 'ds-2',
    message: 'Dataset has not been updated in 48 hours',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    ackBy: '2',
  },
]

/**
 * Initialize stores with seed data for development
 */
export function initializeSeedData() {
  // This will be called in main.tsx during development
  const isDevelopment = import.meta.env.DEV

  if (isDevelopment) {
    // Import stores dynamically to avoid circular dependencies
    import('@/stores').then(({ useAuthStore, useDatasetsStore, useAlertsStore }) => {
      // Seed auth with Ravi (Data Steward) as default user
      const authStore = useAuthStore.getState()
      if (!authStore.isAuthenticated) {
        authStore.login(seedUsers[1], [
          'rules.create',
          'rules.update',
          'dq.run',
          'sla.manage',
          'alerts.manage',
          'exports.read',
          'datasets.read',
        ])
      }

      // Seed datasets
      const datasetsStore = useDatasetsStore.getState()
      if (datasetsStore.datasets.length === 0) {
        datasetsStore.setDatasets(seedDatasets)
      }

      // Seed alerts
      const alertsStore = useAlertsStore.getState()
      if (alertsStore.alerts.length === 0) {
        alertsStore.setAlerts(seedAlerts)
      }
    })
  }
}
