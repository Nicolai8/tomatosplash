export interface PagerData {
  limit: number;
  page: number;
  pages?: number;
  total?: number;
  thisPageLength?: number;
}

export interface Pagination<T> extends PagerData {
  docs: T[];
}
