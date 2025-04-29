import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

interface CustomValidatorOptions extends ValidationOptions {
  validateBy: (value: any, this_object: any) => boolean;
}

export function CustomValidator(validationOptions: CustomValidatorOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'CustomValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return validationOptions.validateBy(value, args.object);
        },
        defaultMessage: () => 'Wrong value!',
      },
    });
  };
}
