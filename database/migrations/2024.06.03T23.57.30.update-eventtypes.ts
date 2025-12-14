  import type { Knex } from "knex";

/**
 * Migration `update-eventtypes`
 */

export default {
  up: async (knex: Knex) => {
    await knex("eventtypes").update("active", true);
  },
};
