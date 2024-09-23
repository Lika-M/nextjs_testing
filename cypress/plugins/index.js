/// <reference types="cypress" />
const { resetDB } = require("../../__tests__/__mocks__/db/utils/reset-db");
const { addBand } = require("../../lib/features/bands/queries");
const {addReservation} = require("../../lib/features/reservations/queries");
const dotenv = require('dotenv');
dotenv.config({ path: '.env.test.local' });
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // To access within a test function:
  // Cypress.env("REVALIDATION_SECRET")
  config.env.REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;
  on("task", {
    // reset db before test
    "db:reset": () => resetDB().then(() => null),
    "addNewBand": (newBand) => addBand(newBand).then(() => null),
    "addNewReservation": (newReservation) => addReservation(newReservation).then(() => null)
  });

  config.env.TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
  config.env.TEST_PASSWORD = process.env.TEST_PASSWORD;

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  return config;
}
