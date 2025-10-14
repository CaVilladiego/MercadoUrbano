export interface UsersApiPort {
  getUserById(userId: string): Promise<any>;
  listAllStores(): Promise<any[]>;
}
