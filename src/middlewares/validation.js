function generateValidationMiddleware(joiSchema, validateProperty) {
  return async function validationMiddleware(req, res, next) {
    try {
      const value = await joiSchema.validateAsync(req[validateProperty]);
      req[validateProperty] = value;
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  generateValidationMiddleware,
};
