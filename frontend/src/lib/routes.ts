import type { Role } from '@/types'

export interface RouteConfig {
  path: string
  label: string
  icon?: string
  roles?: Role[]
  children?: RouteConfig[]
}

/**
 * Sidebar navigation configuration based on PRD
 */
export const sidebarRoutes: RouteConfig[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
  },
  {
    path: '/data-catalog',
    label: 'Data Catalog',
    icon: 'Database',
  },
  {
    path: '/dqa-pipeline',
    label: 'DQA Pipeline',
    icon: 'GitBranch',
  },
  {
    path: '/pii-masking',
    label: 'PII Masking',
    icon: 'ShieldCheck',
  },
  {
    path: '/ai-insights',
    label: 'AI Insights',
    icon: 'Sparkles',
  },
  {
    path: '/dq-reports',
    label: 'DQ Reports',
    icon: 'FileText',
  },
  {
    path: '/alerts',
    label: 'Alerts & Notifications',
    icon: 'Bell',
  },
  {
    path: '/admin',
    label: 'Admin',
    icon: 'Settings',
    roles: ['it_admin', 'auditor'],
    children: [
      {
        path: '/admin/tickets',
        label: 'Tickets & Approvals',
        roles: ['it_admin'],
      },
      {
        path: '/admin/users',
        label: 'User Management',
        roles: ['it_admin'],
      },
      {
        path: '/admin/policies',
        label: 'Access Policies',
        roles: ['it_admin'],
      },
      {
        path: '/admin/connectors',
        label: 'Connectors & Secrets',
        roles: ['it_admin'],
      },
      {
        path: '/admin/audit',
        label: 'Audit Logs',
        roles: ['it_admin', 'auditor'],
      },
    ],
  },
  {
    path: '/exports',
    label: 'Exports',
    icon: 'Download',
  },
  {
    path: '/starbi',
    label: 'StarBI Dashboards',
    icon: 'BarChart3',
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: 'Cog',
  },
]

/**
 * Dashboard tabs configuration
 */
export const dashboardTabs = [
  'Overview',
  'Data Steward',
  'IT Admin',
  'Business User',
  'System Copilot',
]
