const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export const email = (value) => {
  const valid = validEmailRegex.test(value);
  const message = !valid ? `The field must be valid email.` : '';

  return {
    valid,
    message
  }
};

