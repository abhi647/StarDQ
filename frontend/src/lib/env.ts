/**
 * Environment variables configuration
 * All environment variables must be prefixed with VITE_ to be exposed to the client
 */

export const env = {
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  wsUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:8000',

  // Authentication (Auth0)
  auth0: {
    domain: import.meta.env.VITE_AUTH0_DOMAIN || '',
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || '',
    audience: import.meta.env.VITE_AUTH0_AUDIENCE || '',
  },

  // OpenAI API
  openaiApiKey: import.meta.env.VITE_OPENAI_API_KEY || '',

  // Feature Flags
  features: {
    copilotBeta: import.meta.env.VITE_FEATURE_COPILOT_BETA === 'true',
    workflowCanvas: import.meta.env.VITE_FEATURE_WORKFLOW_CANVAS === 'true',
    neo4jLineage: import.meta.env.VITE_FEATURE_NEO4J_LINEAGE === 'true',
  },

  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const

// Validate required environment variables
export function validateEnv() {
  const required = [
    'VITE_API_BASE_URL',
    'VITE_AUTH0_DOMAIN',
    'VITE_AUTH0_CLIENT_ID',
  ]

  const missing = required.filter(key => !import.meta.env[key])

  if (missing.length > 0 && env.isProduction) {
    throw new Error(
      `Missing required environment variables:\n${missing.join('\n')}`
    )
  }

  return true
}
