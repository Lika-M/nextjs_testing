/// <reference types="cypress" />
const { resetDB } = require("../../__tests__/__mocks__/db/utils/reset-db");
const { addBand } = require("../../lib/features/bands/queries");
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on("task", {
    // reset db before test
    "db:reset": () => resetDB().then(() => null),
    "addNewBand": (newBand) => addBand(newBand).then(() => null)
  });

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}
