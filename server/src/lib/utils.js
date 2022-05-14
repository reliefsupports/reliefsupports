export const CommonResponse = (
  success,
  data = '',
  message = '',
  error = ''
) => ({
  success,
  data,
  message,
  error,
});
