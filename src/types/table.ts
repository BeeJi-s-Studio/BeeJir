export interface TableColumn<T = any> {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  width?: string
  render?: (row: T) => any
}

export type SortDirection = 'asc' | 'desc' | null
