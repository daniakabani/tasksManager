const joi = require("@hapi/joi");

exports.getByID = {
  schema: () => {
    return joi.object().keys({
      id: joi.number().required(),
    });
  },
};
