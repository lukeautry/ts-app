const testId = (val: string) => `[data-testid=${val}]`;

context("Basic Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3037");
  });

  it("can add user", () => {
    console.log("can do nothing", testId);
  });
});
