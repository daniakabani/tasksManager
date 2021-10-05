const joi = require("joi");

exports.getAll = {
  schema: () => {
    return joi.object().keys({
      status: joi.string().optional().valid("in-progress", "done", "completed"),
      page: joi.number().positive().optional(),
      page_size: joi.number().positive().optional().allow(null, ""),
    });
  },
};

exports.getByID = {
  schema: () => {
    return joi.object().keys({
      id: joi.number().positive().required(),
    });
  },
};

exports.getByUUID = {
  schema: () => {
    return joi.object().keys({
      uuid: joi.string().required(),
    });
  },
};

exports.deleteTask = {
  schema: () => {
    return joi.object().keys({
      id: joi.number().positive().required(),
    });
  },
};

exports.getByUUID = {
  schema: () => {
    return joi.object().keys({
      uuid: joi.string().guid().required(),
    });
  },
};

exports.create = {
  schema: () => {
    return joi.object().keys({
      assigned_user: joi.number().positive().optional().allow(null, ""),
      status: joi.string().optional().valid("in-progress", "done", "completed"),
      title: joi.string().required().max(75),
      description: joi.string().max(255).optional(),
    });
  },
};

exports.update = {
  schema: () => {
    return joi.object().keys({
      id: joi.number().positive().required(),
      assigned_user: joi.number().positive().optional().allow(null, ""),
      status: joi.string().optional().valid("in-progress", "done", "completed"),
      title: joi.string().required().max(75),
      description: joi.string().max(255).optional(),
    });
  },
};
