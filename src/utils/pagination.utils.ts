import { IPaginationOptions } from './types/pagination-options';

export function getPaginationOptions(query: IPaginationOptions) {
  return {
    skip: (query.page - 1) * query.limit,
    take: query.limit,
  };
}
