import { registerDecorator, ValidationOptions } from 'class-validator';
interface MyValidationOptions extends ValidationOptions {
  /**
   * @default true
   */
  required?: boolean;
}

export function isValidPhoneNumber(value: any) {
  return typeof value === 'string' && Boolean(value.match(/^\+998\d{9}$/));
}

export function IsValidPhoneNumber(validationOptions?: MyValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: 'invalid',
      },
      validator: {
        validate(value: any) {
          if (validationOptions && validationOptions.required === false) {
            if (value) {
              return Boolean(value.match(/^\+998\d{9}$/));
            }

            return true;
          }

          return isValidPhoneNumber(value);
        },
      },
    });
  };
}
