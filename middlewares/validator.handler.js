const boom = require('@hapi/boom');

function validatorHandler (schema, property) {//closures
  return function (req, res, next) {
    const data = req[property];//req.body || req.query || req.params
    const { error } = schema.validate(data, { abortEarly : false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;