import { IPaginationOptions } from './types/pagination-options';

export const inifinityPaginatedResponse = <T>(
  data: T[],
  options: IPaginationOptions,
) => {
  return {
    data,
    hasNextPage: data.length === options.limit,
  };
};
