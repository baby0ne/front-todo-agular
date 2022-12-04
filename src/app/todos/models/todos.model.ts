export interface BaseResponse<D> {
  data: D
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}

export interface Todo {
  id: number
  title: string
  tasks: any
}
