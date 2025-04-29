import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { enumEntires } from '../object.utils';

export const ApiEnum = (
  entity: object,
  { isArray = false, type = 'number', required = true } = {},
) => {
  const ens = enumEntires(entity);

  const desc = `<tbody>${ens
    .map((e) => `<div>${e[1]} => ${e[0]}<div>`)
    .join('')}</tbody>`;
  return applyDecorators(
    ApiProperty({
      type: type as 'string' | 'number' | 'boolean',
      isArray: isArray,
      description: desc,
      example: ens[0][1],
      required: required,
    }),
  );
};
