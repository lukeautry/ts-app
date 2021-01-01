const testId = (val: string) => `[data-testid=${val}]`;
export const get = (val: string) => cy.get(testId(val));
export const click = (val: string) => get(val).click();
export const type = (val: string, input: string) => get(val).type(input);
