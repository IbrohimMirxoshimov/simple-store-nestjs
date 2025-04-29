import { ResponseItems } from './types/express.type';

export const paginatedResponse = (
  type_orm_result: [any[], number],
  options: Record<string | 'page', any>,
  other?: object,
): ResponseItems => {
  return {
    items: type_orm_result[0],
    total: type_orm_result[1],
    page: options.page,
    message: 'Success',
    ...other,
  };
};
