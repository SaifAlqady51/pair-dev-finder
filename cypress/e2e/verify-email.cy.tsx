describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("/authentication/register/verify-email"); // Update the path based on your routing structure
  });

  it("should display the correct page title", () => {
    cy.title().should("eq", "Register | Verify Email");
  });

  it("should render the register title and login link", () => {
    cy.get('[data-cy="verify-email-title"]').should(
      "contain",
      "Create new account",
    );
    cy.get('[data-cy="already-have-an-account"]').should("exist");
    cy.get('[data-cy="login-link"]')
      .should("contain", "Log in")
      .and("have.attr", "href", "/authentication/login");
  });
  it("renders the form with input and submit button", () => {
    cy.get('[data-cy="verify-email-input"]').should("be.visible");
    cy.get('input[placeholder="JohnDoe@example.com"]').should("exist");
    cy.get('button[type="submit"]').should("be.visible").and("not.be.disabled");
  });
  it("displays validation error when submitting empty form", () => {
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy="veify-email-error-message"]').should(
      "contain",
      "Email is required",
    );
  });

  it("displays validation error when submitting wrong email format", () => {
    cy.get('input[name="email"]').type("wrongEmailFormat");
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy="veify-email-error-message"]').should(
      "contain",
      "Invalid email address",
    );
  });
  it("show email already used if the email is in the database", () => {
    cy.get('input[name="email"]').type("test654432444@gmail.com");
    cy.get('button[type="submit"]').click();
    cy.contains("Email address already in use").should("exist");
  });

  it("navigates to /authentication/register/confirm-code on submit email", () => {
    cy.get('input[name="email"]').type("unusedEmail@example.com");
    cy.get('button[type="submit"]').click();
    cy.wait(7000);
    cy.url().should("include", "/authentication/register/confirm-code");
  });

  it("should render the ProviderButtons component correctly", () => {
    // Check if the "or continue with" text is rendered
    cy.contains("or continue with").should("be.visible");

    // Check if the Google button is rendered
    cy.get("button").contains("Google").should("be.visible");
    cy.get("svg").should("exist"); // Check for the Google icon

    // Check if the GitHub button is rendered
    cy.get("button").contains("Github").should("be.visible");
    cy.get("svg").should("exist"); // Check for the GitHub icon
  });
});
