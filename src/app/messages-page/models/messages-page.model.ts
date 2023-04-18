export interface Sender {
  id: number
  username: string
  picture: string
}
export interface Message {
  id: number
  text: string
  my: boolean
}
export interface Messages {
  [id: number]: Message[]
}
