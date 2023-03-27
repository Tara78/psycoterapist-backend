
export const errorMessage = (err, message) => {
  return {
    success: false,
    response: err,
    message:message
  }
}