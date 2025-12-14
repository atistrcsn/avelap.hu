/**
 * event controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::event.event', ({ strapi }) => ({
  async findOne(ctx) {
    const { slug } = ctx.params;

    const query = {
      filters: { slug },
      ...ctx.query,
    };

    const event = await strapi.documents("api::event.event").findMany(query);

    const sanitizedEntity = await this.sanitizeOutput(event, ctx);

    console.log(sanitizedEntity);

    return this.transformResponse(sanitizedEntity[0]);
  },
}));
