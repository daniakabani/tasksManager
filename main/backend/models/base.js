const { Model } = require("objection");
const knexInstanceFile = require("daniakabani/knexfile");
const knex = require("knex");
Model.knex(knex(knexInstanceFile));

module.exports = Model;
