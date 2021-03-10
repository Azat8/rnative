export const minLength = (min, value) => {
  const valid = value.length < min;
  const message = !valid ? `The field must be greater than ${min} character.` : '';

  return {
    valid,
    message
  }
};