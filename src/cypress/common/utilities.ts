import { setAccessToken } from "../../client/App/common/access-token-cache";
import { getCypressTaskRoute } from "../../server/routes/get-cypress-task-route";
import { cypressConstants } from "./cypress-constants";

const testId = (val: string) => `[data-testid=${val}]`;
export const get = (val: string) => cy.get(testId(val));
export const click = (val: string) => get(val).click();
export const type = (val: string, input: string) =>
  get(val).clear().type(input);

const { baseUrl, email, password, name } = cypressConstants;

export const logIntoApp = () => {
  cy.visit(baseUrl);
  cy.request(
    getCypressTaskRoute(baseUrl, "createUser", { email, password, name })
  ).then((response) => {
    setAccessToken(response.body.value);
    return cy.reload();
  });
};
