export interface TokenManager {
  sign(payload: Record<string, string>): string
}
