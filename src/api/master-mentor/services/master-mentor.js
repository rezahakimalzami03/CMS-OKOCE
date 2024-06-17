'use strict';

/**
 * master-mentor service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::master-mentor.master-mentor');
