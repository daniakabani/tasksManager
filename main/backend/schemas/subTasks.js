const joi = require("joi");

exports.getById = {
  schema: () => {
    return joi.object().keys({
      id: joi.number().positive().required(),
    });
  },
};

exports.create = {
  schema: () => {
    return joi.object().keys({
      parent_task_id: joi.number().positive().required(),
      title: joi.string().max(65),
      status: joi.string().optional().valid("in-progress", "done", "completed"),
      description: joi.string().optional().allow("", null),
      assigned_user: joi.number().positive().optional().allow(null, ""),
    });
  },
};

exports.update = {
  schema: () => {
    return joi.object().keys({
      parent_task_id: joi.number().positive().required(),
      title: joi.string().max(65),
      status: joi.string().optional().valid("in-progress", "done", "completed"),
      description: joi.string().optional().allow("", null),
      assigned_user: joi.number().positive().optional().allow(null, ""),
      id: joi.number().positive().required(),
    });
  },
};
