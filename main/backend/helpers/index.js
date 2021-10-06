const { randomBytes } = require("crypto"),
  { NotFoundError } = require("objection");

exports.randomGenerator = async (length = 20) => {
  return new Promise((resolve, reject) => {
    try {
      randomBytes(length, function (err, buffer) {
        let random = buffer.toString("hex");
        resolve(random);
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.expressCallback = (controller) => {
  return async (req, res) => {
    try {
      let controllerResponse = await controller(req, res);
      typeof controllerResponse !== typeof undefined &&
        res.send(controllerResponse);
    } catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404).send({
          message:
            "unable to find the requested resource, make sure you have a valid ID",
          error: e,
        });
      } else if (e.errorCode) {
        res.status(e.status || 400).send({ error: e });
      } else if (e.data) {
        res.status(400).send(e.data);
      } else if (e.nativeError && e.nativeError.code) {
        console.warn("SQL error");
        console.error(e);
        res.status(409).send({
          error: "Failed to execute your query",
          message: e.nativeError.detail,
        });
      } else if (e.name === "Validation Error") {
        res.status(400).send(e.content);
      } else {
        console.error(e);
        res.status(500).send({
          message:
            "Whoops looks like we are having some troubles, please try again later, or contact support for more info",
        });
      }
    }
  };
};

exports.schemaValidator = async (schema, body) => {
  try {
    return await schema.schema().validateAsync(body, { abortEarly: false });
  } catch (e) {
    let error = e.details;
    let errorArray = [];
    error.map((error) => {
      errorArray.push({
        code: 400,
        title: "Validation Error",
        details: error.message,
      });
    });
    throw {
      name: "Validation Error",
      content: {
        error: "validation error",
        reason: errorArray,
      },
    };
  }
};
