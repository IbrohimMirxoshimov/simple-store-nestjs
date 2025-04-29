import { registerDecorator, ValidationOptions } from 'class-validator';
import { isPositiveInt } from './validator.functions';

export function IsPositiveInt(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsPositiveInt',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,

      validator: {
        validate(value?: any) {
          return isPositiveInt(value);
        },
        defaultMessage: () => 'Value is not positive intager!',
      },
    });
  };
}
