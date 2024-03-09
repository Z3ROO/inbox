export interface APIResponse<Data = null> {
  success: boolean
  data: Data
  statusCode: number
  message: string
}
