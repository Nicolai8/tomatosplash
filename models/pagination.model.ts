export interface PagerData {
  limit: number;
  page: number;
  pages?: number;
  total?: number;
}

export interface Pagination<T> extends PagerData {
  docs: T[];
}
