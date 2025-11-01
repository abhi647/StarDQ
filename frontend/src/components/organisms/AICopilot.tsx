import { useState, useRef, useEffect } from 'react'
import {
  Sparkles,
  Send,
  X,
  Loader2,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  Lightbulb,
  Code,
  Wand2,
  AlertTriangle,
  TrendingUp,
  Database,
  FileCode
} from 'lucide-react'
import { useUIStore } from '@/stores'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestions?: Suggestion[]
  code?: string
}

interface Suggestion {
  id: string
  type: 'rule' | 'cleaning' | 'optimization' | 'alert'
  title: string
  description: string
  code?: string
  impact: 'high' | 'medium' | 'low'
  autoApplicable: boolean
}

const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    type: 'cleaning',
    title: 'Standardize Email Format',
    description: 'Convert all email addresses to lowercase and trim whitespace',
    code: `df['email'] = df['email'].str.lower().str.strip()`,
    impact: 'medium',
    autoApplicable: true
  },
  {
    id: '2',
    type: 'rule',
    title: 'Add Phone Validation Rule',
    description: 'Validate phone numbers match (XXX) XXX-XXXX format',
    code: `def validate_phone(phone):
    pattern = r'\\(\\d{3}\\) \\d{3}-\\d{4}'
    return bool(re.match(pattern, str(phone)))`,
    impact: 'high',
    autoApplicable: false
  },
  {
    id: '3',
    type: 'cleaning',
    title: 'Fill Missing Dates',
    description: 'Replace null dates with median date value',
    code: `df['date'].fillna(df['date'].median(), inplace=True)`,
    impact: 'low',
    autoApplicable: true
  },
  {
    id: '4',
    type: 'optimization',
    title: 'Optimize Data Types',
    description: 'Convert string columns to category to reduce memory usage',
    code: `for col in ['status', 'category']:
    df[col] = df[col].astype('category')`,
    impact: 'medium',
    autoApplicable: true
  }
]

export function AICopilot() {
  const { toggleCopilot } = useUIStore()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Data Quality Assistant. I can help you with:\n\n• Data profiling and analysis\n• Quality rule generation\n• Data cleaning recommendations\n• Anomaly detection\n• Code generation for fixes\n\nWhat would you like to work on today?',
      timestamp: new Date(),
      suggestions: mockSuggestions
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I understand you want to improve your data quality. Based on your dataset analysis, I recommend implementing email validation and standardizing phone number formats. Here are specific actions you can take:',
        timestamp: new Date(),
        suggestions: mockSuggestions.slice(0, 2),
        code: `# Email validation example
import re

def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, str(email)))

# Apply validation
df['email_valid'] = df['email'].apply(validate_email)
print(f"Valid emails: {df['email_valid'].sum()}/{len(df)}")`
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'cleaning': return Wand2
      case 'rule': return FileCode
      case 'optimization': return TrendingUp
      case 'alert': return AlertTriangle
      default: return Lightbulb
    }
  }

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'cleaning': return '#00B3CA'
      case 'rule': return '#007787'
      case 'optimization': return '#10b981'
      case 'alert': return '#FFA500'
      default: return '#64748B'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#ef4444'
      case 'medium': return '#FFA500'
      case 'low': return '#00B3CA'
      default: return '#64748B'
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'white',
      borderLeft: '1px solid #E2E8F0'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '2px solid #E7F9F5',
        backgroundColor: '#F8F9FA'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            backgroundColor: '#E7F9F5',
            padding: '10px',
            borderRadius: '10px'
          }}>
            <Sparkles size={20} style={{ color: '#00B3CA' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#012F35', margin: 0 }}>
              AI Data Quality Assistant
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
              Powered by GPT-4
            </p>
          </div>
          <button
            onClick={toggleCopilot}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E2E8F0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={20} style={{ color: '#64748B' }} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {messages.map(message => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%'
            }}
          >
            <div style={{
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: message.role === 'user' ? '#007787' : '#F8F9FA',
              color: message.role === 'user' ? 'white' : '#012F35',
              fontSize: '14px',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap'
            }}>
              {message.content}
            </div>

            {/* Code Block */}
            {message.code && (
              <div style={{
                backgroundColor: '#1e1e1e',
                borderRadius: '8px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#d4d4d4',
                position: 'relative',
                overflow: 'auto'
              }}>
                <button
                  onClick={() => handleCopyCode(message.code!)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    padding: '6px 12px',
                    backgroundColor: copiedCode === message.code ? '#10b981' : '#374151',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {copiedCode === message.code ? (
                    <>
                      <Check size={14} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
                <pre style={{ margin: 0, marginTop: '24px' }}>
                  <code>{message.code}</code>
                </pre>
              </div>
            )}

            {/* Suggestions */}
            {message.suggestions && message.suggestions.length > 0 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginTop: '8px'
              }}>
                {message.suggestions.map(suggestion => {
                  const SuggestionIcon = getSuggestionIcon(suggestion.type)
                  return (
                    <div
                      key={suggestion.id}
                      style={{
                        backgroundColor: 'white',
                        border: '2px solid #E7F9F5',
                        borderRadius: '10px',
                        padding: '16px'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                        <div style={{
                          backgroundColor: `${getSuggestionColor(suggestion.type)}20`,
                          padding: '8px',
                          borderRadius: '8px',
                          height: 'fit-content'
                        }}>
                          <SuggestionIcon size={18} style={{ color: getSuggestionColor(suggestion.type) }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#012F35', margin: 0 }}>
                              {suggestion.title}
                            </h4>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '10px',
                              fontSize: '10px',
                              fontWeight: '700',
                              backgroundColor: `${getImpactColor(suggestion.impact)}20`,
                              color: getImpactColor(suggestion.impact),
                              textTransform: 'uppercase'
                            }}>
                              {suggestion.impact}
                            </span>
                            {suggestion.autoApplicable && (
                              <span style={{
                                padding: '2px 8px',
                                borderRadius: '10px',
                                fontSize: '10px',
                                fontWeight: '600',
                                backgroundColor: '#F0FDF4',
                                color: '#10b981'
                              }}>
                                AUTO-APPLY
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: '13px', color: '#64748B', margin: 0, marginBottom: '12px' }}>
                            {suggestion.description}
                          </p>
                          {suggestion.code && (
                            <div style={{
                              backgroundColor: '#F8F9FA',
                              borderRadius: '6px',
                              padding: '10px',
                              fontFamily: 'monospace',
                              fontSize: '12px',
                              color: '#012F35',
                              marginBottom: '12px',
                              overflow: 'auto'
                            }}>
                              <code>{suggestion.code}</code>
                            </div>
                          )}
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {suggestion.autoApplicable ? (
                              <button style={{
                                padding: '6px 14px',
                                backgroundColor: '#007787',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}>
                                <Wand2 size={14} />
                                Apply Now
                              </button>
                            ) : (
                              <button style={{
                                padding: '6px 14px',
                                backgroundColor: '#E7F9F5',
                                color: '#007787',
                                border: '1px solid #00B3CA',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}>
                                <Code size={14} />
                                Review Code
                              </button>
                            )}
                            <button style={{
                              padding: '6px 14px',
                              backgroundColor: '#F8F9FA',
                              border: '1px solid #E2E8F0',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '500',
                              color: '#64748B',
                              cursor: 'pointer'
                            }}>
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            <div style={{ fontSize: '11px', color: '#94A3B8' }}>
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: '#F8F9FA',
            borderRadius: '12px',
            maxWidth: '200px'
          }}>
            <Loader2 size={16} style={{ color: '#00B3CA', animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: '14px', color: '#64748B' }}>AI is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid #E2E8F0',
        backgroundColor: '#F8F9FA'
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-end'
        }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Ask me about data quality, cleaning, or rules..."
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              fontSize: '14px',
              resize: 'none',
              minHeight: '48px',
              maxHeight: '120px',
              outline: 'none',
              fontFamily: 'Segoe UI, system-ui, sans-serif'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#00B3CA'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            style={{
              padding: '12px 16px',
              backgroundColor: input.trim() && !isLoading ? '#007787' : '#E2E8F0',
              color: input.trim() && !isLoading ? 'white' : '#94A3B8',
              border: 'none',
              borderRadius: '10px',
              cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
          >
            <Send size={16} />
          </button>
        </div>
        <div style={{
          fontSize: '11px',
          color: '#94A3B8',
          marginTop: '8px',
          textAlign: 'center'
        }}>
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}
