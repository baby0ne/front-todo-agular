export interface BaseResponse<D> {
  data: D
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}

export interface Todo {
  id: number
  title: string
}

export type FilterType = 'all' | 'active' | 'complete'

export interface TodoDomainType extends Todo {
  filter: FilterType
}

export interface Task {
  id: number
  task: string
  active: boolean
}

export interface DomainTask {
  [key: string]: Task[]
}
