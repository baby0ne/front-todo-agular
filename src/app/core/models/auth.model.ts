export interface Login {
  username: string
  password: string
}

export interface AuthResponse {
  id: number
  email: string
  password: string
  'jwt-token': string
}

export interface MyProfile {
  id: number
  username: string
  picture: string
  taskCount: number
  taskCompleted: number
  todoCount: number
}
