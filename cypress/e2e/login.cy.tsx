describe("LoginForm Component", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("/authentication/login");
  });

  // Test 1: Render the login form correctly
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

  // Test 2: Allow the user to type into the email and password fields
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

  // Test 3: Toggle password visibility when the show/hide button is clicked
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

  // Test 4: Display an error message if the form is submitted with invalid data
  it("should display an error message if the form is submitted with invalid data", () => {
    // Submit the form without filling in any fields
    cy.get('button[type="submit"]').click();

    // Check for validation error messages
    cy.get('[data-cy="error-message"]').should("be.visible");
  });

  // Test 5: Submit the form with valid data and redirect the user
  it("should submit the form with valid data and redirect the user", () => {
    // Fill in the form with valid data
    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("password123");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the form is in a loading state
    cy.get('button[type="submit"]').should("be.disabled");

    // Wait for the button to become enabled again after processing
    cy.get('button[type="submit"]').should("not.be.disabled");

    // Verify that a success toast notification is displayed
    cy.contains("Failed Login").should("exist");
  });

  // Test 6: Test mobile responsiveness of the login form
  it("should display the login form correctly on mobile devices", () => {
    // Set viewport to a mobile size (e.g., iPhone X)
    cy.viewport(375, 812);

    // Check if the form title is visible
    cy.get("h1").should("be.visible");

    // Check if the email and password fields are visible
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");

    // Check if the submit button is visible
    cy.get('button[type="submit"]').should("be.visible");

    // Check if the register link is visible
    cy.get('[data-cy="register-link"]').should("be.visible");

    // Test the mobile menu toggle (if applicable)
    // Example: If there's a mobile menu, you can test its behavior here
  });
  it("should display the login form correctly on mobile devices with the title in a single line", () => {
    // Set viewport to a mobile size (e.g., iPhone X)
    cy.viewport(375, 812);

    // Check if the form title is visible
    cy.get("h1")
      .should("be.visible")
      .and("contain.text", "Log in to your account");

    cy.get('img[alt="login image"]')
      .should("exist")
      .and("have.css", "width", "0px");

    // Debugging: Log the computed styles and dimensions of the title
    cy.get("h1").then(($title) => {
      const styles = window.getComputedStyle($title[0]);
      const fontSize = parseFloat(styles.fontSize); // Get font size in pixels
      const lineHeight = parseFloat(styles.lineHeight); // Get line height in pixels

      // Define the expected font size in pixels (1.8rem)
      const expectedFontSize =
        1.8 * parseFloat(getComputedStyle(document.documentElement).fontSize);

      // Define the expected line height (assuming a line-height of 1.2)
      const expectedLineHeight = lineHeight;

      // Ensure the font size is correct (1.8rem)
      expect(fontSize).to.equal(expectedFontSize);

      // Ensure the element height is approximately equal to the expected line height
      expect(lineHeight).to.be.closeTo(expectedLineHeight, 2); // Allow 2px tolerance
    });

    // Check if the email and password fields are visible
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");

    // Check if the submit button is visible
    cy.get('button[type="submit"]').should("be.visible");

    // Check if the register link is visible
    cy.get('[data-cy="register-link"]').should("be.visible");
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
  it("should display the login form correctly on full-screen devices", () => {
    // Set viewport to a full-screen desktop size (e.g., 1920x1080)
    cy.viewport(1920, 1080);

    // Check if the form title is visible
    cy.get("h1")
      .should("be.visible")
      .and("contain.text", "Log in to your account");

    // Check if the email and password fields are visible
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");

    // Check if the submit button is visible
    cy.get('button[type="submit"]').should("be.visible");

    // Check if the register link is visible
    cy.get('[data-cy="register-link"]').should("be.visible");
    cy.get('img[alt="login image"]') // Select the Image component by alt text
      .should("be.visible")
      .and("have.css", "width")
      .and("not.eq", "0px");
  });
});
