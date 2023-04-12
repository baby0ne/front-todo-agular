//image to base64
export const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
  const reader = new FileReader()
  reader.onloadend = () => {
    const file64 = reader.result as string
    callBack(file64)
  }
  reader.readAsDataURL(file)
}

export interface Profile {
  id: number
  username: string
  picture: string
  taskCount: number
  taskCompleted: number
  todoCount: number
}
