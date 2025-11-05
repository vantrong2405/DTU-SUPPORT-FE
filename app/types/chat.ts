export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export type ToolName = 'calculateTargetGpa' | 'calculateSimulationGpa' | 'calculatePeGpa' | 'calculateRequiredFinalScore' | 'calculateFinalScore'

export type UiComponent = 'GpaResultCard' | 'PeResultCard' | 'FinalScoreResultCard'

export interface ToolResult {
  toolName: ToolName
  data: Record<string, unknown>
  uiComponent: UiComponent
}

export interface ChatMetadata {
  messageId: string
  timestamp: string
  intent: 'calculation' | 'question'
}

export interface ChatResponseData {
  content: string
  toolResult?: ToolResult
  metadata: ChatMetadata
}

export interface ChatResponse {
  data: ChatResponseData
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  toolResult?: ToolResult
}
