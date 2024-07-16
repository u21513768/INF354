import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
  standalone: true
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    // Remove any non-numeric characters from the input value
    const cleanedValue = value.replace(/\D/g, '');

    // Format the phone number as 3-3-4 digits
    const formattedValue = cleanedValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

    return formattedValue;
  }
}
