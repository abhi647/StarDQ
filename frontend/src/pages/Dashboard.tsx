import { BadgePill, KPIStat, HealthDot } from '@/components/atoms'
import { useDatasetsStore, useAlertsStore, useAuthStore } from '@/stores'

export function Dashboard() {
  const { datasets } = useDatasetsStore()
  const { alerts, unreadCount } = useAlertsStore()
  const { user } = useAuthStore()

  // Calculate stats
  const totalDatasets = datasets.length
  const goldDatasets = datasets.filter(d => d.badge === 'Gold').length
  const silverDatasets = datasets.filter(d => d.badge === 'Silver').length
  const bronzeDatasets = datasets.filter(d => d.badge === 'Bronze').length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading font-bold mb-2" style={{ fontSize: '30px' }}>
          Dashboard
        </h1>
        <p style={{ color: '#A8DCDB' }}>
          Welcome to StarDQ 2.0 - AI-augmented Data Quality Platform
        </p>
        {user && (
          <p className="mt-2 text-sm">
            Logged in as <strong>{user.name}</strong> ({user.role})
          </p>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div style={{ backgroundColor: 'white', border: '1px solid #A8DCDB' }} className="p-4 rounded-lg">
          <KPIStat label="Total Datasets" value={totalDatasets} format="number" />
        </div>
        <div style={{ backgroundColor: 'white', border: '1px solid #A8DCDB' }} className="p-4 rounded-lg">
          <KPIStat label="Gold Datasets" value={goldDatasets} format="number" />
        </div>
        <div style={{ backgroundColor: 'white', border: '1px solid #A8DCDB' }} className="p-4 rounded-lg">
          <KPIStat label="Silver Datasets" value={silverDatasets} format="number" />
        </div>
        <div style={{ backgroundColor: 'white', border: '1px solid #A8DCDB' }} className="p-4 rounded-lg">
          <KPIStat label="Active Alerts" value={unreadCount} format="number" />
        </div>
      </div>

      {/* Datasets Overview */}
      <div style={{ backgroundColor: 'white', border: '1px solid #A8DCDB' }} className="p-6 rounded-lg">
        <h2 className="font-heading font-semibold mb-4" style={{ fontSize: '24px' }}>
          Datasets Overview
        </h2>
        {datasets.length > 0 ? (
          <div className="space-y-3">
            {datasets.map(dataset => (
              <div
                key={dataset.id}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: '#E2DFCC' }}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{dataset.name}</h3>
                  <p className="text-sm" style={{ color: '#1B4E54' }}>
                    {dataset.domain} • {dataset.profile.totalRows.toLocaleString()} rows
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <BadgePill badge={dataset.badge} />
                  <HealthDot status="healthy" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#A8DCDB' }}>No datasets available. Start by connecting a data source.</p>
        )}
      </div>

      {/* Recent Alerts */}
      <div style={{ backgroundColor: 'white', border: '1px solid #A8DCDB' }} className="p-6 rounded-lg">
        <h2 className="font-heading font-semibold mb-4" style={{ fontSize: '24px' }}>
          Recent Alerts
        </h2>
        {alerts.length > 0 ? (
          <div className="space-y-2">
            {alerts.slice(0, 5).map(alert => (
              <div
                key={alert.id}
                className="p-3 rounded"
                style={{ backgroundColor: alert.ackBy ? '#E2DFCC' : '#FFC994' }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span
                      className="text-xs font-medium px-2 py-1 rounded"
                      style={{
                        backgroundColor:
                          alert.severity === 'high'
                            ? '#AD3B23'
                            : alert.severity === 'medium'
                            ? '#FFC994'
                            : '#00B3CA',
                        color: 'white',
                      }}
                    >
                      {alert.severity.toUpperCase()}
                    </span>
                    <p className="mt-2 text-sm">{alert.message}</p>
                  </div>
                  {!alert.ackBy && (
                    <span className="text-xs" style={{ color: '#AD3B23' }}>
                      Unread
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#A8DCDB' }}>No alerts at the moment.</p>
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ backgroundColor: 'white', border: '1px solid #A8DCDB' }} className="p-6 rounded-lg">
        <h2 className="font-heading font-semibold mb-4" style={{ fontSize: '24px' }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            className="p-4 rounded-lg text-left hover:opacity-80 transition-opacity"
            style={{ backgroundColor: '#007787', color: 'white' }}
          >
            <h3 className="font-medium mb-1">Connect Data Source</h3>
            <p className="text-sm opacity-90">Add new datasets to StarDQ</p>
          </button>
          <button
            className="p-4 rounded-lg text-left hover:opacity-80 transition-opacity"
            style={{ backgroundColor: '#00B3CA', color: 'white' }}
          >
            <h3 className="font-medium mb-1">Run DQ Pipeline</h3>
            <p className="text-sm opacity-90">Execute data quality checks</p>
          </button>
          <button
            className="p-4 rounded-lg text-left hover:opacity-80 transition-opacity"
            style={{ backgroundColor: '#1B4E54', color: 'white' }}
          >
            <h3 className="font-medium mb-1">AI Insights</h3>
            <p className="text-sm opacity-90">Get AI-powered recommendations</p>
          </button>
        </div>
      </div>
    </div>
  )
}
