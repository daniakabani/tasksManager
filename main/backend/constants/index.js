const statusCodes = {
  OK: 200,
  created: 201,
  unAuthorised: 401,
  badRequest: 400,
  forbidden: 403,
  notFound: 404,
  gone: 410,
  unprocessableEntity: 422,
  internalServerError: 500,
};

module.exports = {
  statusCodes
}