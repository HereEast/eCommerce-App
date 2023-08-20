import { errorMsg } from '../../constant';

export function lastNameValidate(value: string): string {
  let error: string = '';
  const isValidFirstName = /^[a-zA-Z\s]+$/.test(value.trim());

  if (!value) {
    error = errorMsg.lastName.empty;
  } else if (!isValidLastName) {
    error = errorMsg.lastName.invalid;
  }

  return error;
}
