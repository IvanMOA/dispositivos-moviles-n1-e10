export function formErrors(validationError) {
  const errorBag = {};
  const formattedErrors = validationError.error.format();
  delete formattedErrors._errors;
  for (const [key, { _errors: errors }] of Object.entries(formattedErrors)) {
    errorBag[key] = errors;
  }
  return errorBag;
}
