export type PaginationResult<T> = {
  data: T[];
  meta: {
    totalCount: number;
    totalPages: number;
    limit: number;
    page: number;
  };
};
