export interface TokenSignerPort {
  sign(payload: Record<string, any>, opts?: { expiresIn?: string | number }): Promise<string>;
}
