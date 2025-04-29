import { registerDecorator, ValidationOptions } from 'class-validator';
import { isPositiveInt } from './validator.functions';

export function IsOnlyId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsOnlyId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,

      validator: {
        validate(value?: any) {
          return (
            value &&
            typeof value === 'object' &&
            value.id &&
            isPositiveInt(value.id)
          );
        },
        defaultMessage: () => 'Value is not only id or positive intager!',
      },
    });
  };
}
