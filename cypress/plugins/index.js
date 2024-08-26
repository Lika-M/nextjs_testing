/// <reference types="cypress" />
const { resetDB } = require("../../__tests__/__mocks__/db/utils/reset-db");

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // reset db before test
  on("task", {
    "db:reset": () => resetDB().then(() => null)
  });

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}
