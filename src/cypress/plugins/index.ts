/// <reference types="cypress" />

import { UserRepository } from "../../node/database/repositories/user-repository";

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const handler = (on: (val: "task", handlers: {}) => null) => {
  on("task", {
    async deleteUserByEmail(email: string) {
      await new UserRepository().delete({
        email,
      });
      console.log(`user ${email} deleted`);

      return null;
    },
  });
};

export default handler;
