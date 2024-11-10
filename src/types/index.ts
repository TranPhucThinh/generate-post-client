export interface SuccessResponse<Data> {
  status: number
  data: Data
  pagination: {
    total: number
    limit: number
    currentPage: number
    totalPages: number
  }
}

export type TPost = {
  id: string
  title: string
  created_at: string
  content: string
  image: string
  image_url: string
  original_link: string
  domain: string
  favicon: string
}
