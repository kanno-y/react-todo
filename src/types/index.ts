export type Task = {
  id: number
  title: string
  created_at: Date
  updated_at: Date
}

export type CsrfToken = {
  csrf_token: string
}

export type Creadential = {
  email: string
  password: string
}
