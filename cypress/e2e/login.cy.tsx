describe("LoginForm Component", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("/authentication/login");
  });

  it("should render the login form correctly", () => {
    // Check if the form title is rendered
    cy.get("h1").should("contain.text", "Log in to your account");

    // Check if the register link is rendered
    cy.get('[data-cy="register-link"]')
      .should("have.attr", "href", "/authentication/register/verify-email")
      .and("contain.text", "Register");

    // Check if the email and password fields are rendered
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");

    // Check if the submit button is rendered
    cy.get('button[type="submit"]').should("contain.text", "Log in");
  });

  it("should allow the user to type into the email and password fields", () => {
    // Type into the email field
    cy.get('input[name="email"]')
      .type("user@example.com")
      .should("have.value", "user@example.com");

    // Type into the password field
    cy.get('input[name="password"]')
      .type("password123")
      .should("have.value", "password123");
  });

  it("should toggle password visibility when the show/hide button is clicked", () => {
    // Type into the password field
    cy.get('input[name="password"]').type("password123");

    // Check that the password is hidden by default
    cy.get('input[name="password"]').should("have.attr", "type", "password");

    // Click the show/hide password button
    cy.get('[data-cy="show-password-button"]').click();

    // Check that the password is now visible
    cy.get('input[name="password"]').should("have.attr", "type", "text");

    // Click the show/hide password button again
    cy.get('[data-cy="show-password-button"]').click();

    // Check that the password is hidden again
    cy.get('input[name="password"]').should("have.attr", "type", "password");
  });

  it("should display an error message if the form is submitted with invalid data", () => {
    // Submit the form without filling in any fields
    cy.get('button[type="submit"]').click();

    // Check for validation error messages
    cy.get('[data-cy="error-message"]').should("exist");
  });

  // it("should submit the form with valid data and redirect the user", () => {
  //   // Fill in the form with valid data
  //   cy.get('input[name="email"]').type("user@example.com");
  //   cy.get('input[name="password"]').type("password123");
  //
  //   // Submit the form
  //   cy.get('button[type="submit"]').click();
  //
  //   // Verify that the form is in a loading state
  //   cy.get('button[type="submit"]').should("be.disabled");
  //
  //   // Verify that a success toast notification is displayed
  //   cy.contains("Failed Login").should("exist");
  // });

  // it("should disable the submit button while the form is processing", () => {
  //   // Mock a delayed API response
  //   cy.intercept("POST", "/api/login", {
  //     delay: 2000, // Simulate a 2-second delay
  //     statusCode: 200,
  //     body: { success: true, token: "fake-token" },
  //   }).as("loginRequest");
  //
  //   // Fill in the form with valid data
  //   cy.get('input[name="email"]').type("user@example.com");
  //   cy.get('input[name="password"]').type("password123");
  //
  //   // Submit the form
  //   cy.get('button[type="submit"]').click();
  //
  //   // Check if the submit button is disabled while processing
  //   cy.get('button[type="submit"]').should("be.disabled");
  //
  //   // Wait for the mock API request to complete
  //   cy.wait("@loginRequest");
  //
  //   // Check if the submit button is enabled again after processing
  //   cy.get('button[type="submit"]').should("not.be.disabled");
  // });
});
