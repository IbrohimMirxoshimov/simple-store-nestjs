import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

export const ApiPaginatedResponse = (dto: any) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          items: {
            type: 'object',
          },
          total: {
            type: 'number',
          },
          page: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
      },
    }),
  );
};
