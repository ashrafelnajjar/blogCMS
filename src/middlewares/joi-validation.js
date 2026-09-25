const AppError = require("../utils/AppError");

// Higher-Order Function
const joivalidation = (schema) => {
  return (req, res, next) => {
    const targets = ['params', 'body', 'query'];

    for (const target of targets) {
      if (schema[target]) {
        const { error } = schema[target].validate(req[target], {
          abortEarly: false,
        });

        if (error) {
          const errorMessage = error.details
            .map((err) => err.message)
            .join(", ");
          return next(new AppError(errorMessage, 400));
        }
      }
    }

    next();
  };
};

module.exports = joivalidation;