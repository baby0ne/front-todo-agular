export interface UsersResponse {
  profiles: User[]
  count: number
}
export interface User {
  id: number
  username: string
  picture: string
}
