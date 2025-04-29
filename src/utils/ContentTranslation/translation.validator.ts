import {
  isObject,
  maxLength,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { TranslationLocales, TranslationLocalesMap } from './translation.types';

export function TranslationValidator(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'CustomValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!isObject(value)) {
            return false;
          }

          for (const locale in value) {
            if (Object.prototype.hasOwnProperty.call(value, locale)) {
              const translation = (value as any)[locale];

              if (
                !(
                  TranslationLocalesMap.get(locale) &&
                  maxLength(translation, 255)
                )
              ) {
                return false;
              }
            }
          }

          return true;
        },
        defaultMessage: () =>
          'Aviable locales: ' + TranslationLocales.join(', '),
      },
    });
  };
}
