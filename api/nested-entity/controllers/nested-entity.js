"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const data = await strapi.services["nested-entity"].find();
    console.log("Find all nested");
    return sanitizeEntity(data, { model: strapi.models["nested-entity"] });
  },
  /**
   * Callback executed before finding one instance of model
   * @param {KoaContext} ctx
   */
  async findOne(ctx) {
    const data = await strapi.services["nested-entity"].findOne({
      id: ctx.params.id,
    });
    console.log("Find one nested");

    return sanitizeEntity(data, { model: strapi.models["nested-entity"] });
  },
};
