"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const data = await strapi.services["root-entity"].find();

    if (data.length > 0) {
      console.log("dropping data.nested_entities");
      delete data[0].nested_entities;
    }

    console.log(data);
    return sanitizeEntity(data, { model: strapi.models["root-entity"] });
  },
  /**
   * Callback executed before finding one instance of model
   * @param {KoaContext} ctx
   */
  async findOne(ctx) {
    const data = await strapi.services["root-entity"].findOne({
      id: ctx.params.id,
    });

    return sanitizeEntity(data, { model: strapi.models["root-entity"] });
  },
};
