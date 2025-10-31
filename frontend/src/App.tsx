import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppShell } from './components/layouts'
import { Dashboard, DataCatalog, DatasetDetail } from './pages'
import { validateEnv } from './lib/env'

// Validate environment variables on app load (only warns in development)
try {
  validateEnv()
} catch (error) {
  if (import.meta.env.DEV) {
    console.warn('Environment validation failed:', error)
  }
}

// Create a React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/data-catalog" element={<DataCatalog />} />
            <Route path="/datasets/:id" element={<DatasetDetail />} />
            <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
