describe("Confirm Code Page", () => {
  beforeEach(() => {
    // Visit the confirm code page before each test
    cy.visit("/authentication/register/confirm-code"); // Update the path based on your routing structure
  });

  // Check if the verification code input is present
  it("should render OTP input and contain 6 individual input slots", () => {
    // Visit the page where the form is located

    cy.get("h1").should("contain", "Enter verification code");
    // Ensure the OTP input group is visible
    cy.get('[data-cy="InputOTPGroup"]').should("be.visible");

    // Ensure there are exactly 6 InputOTPSlot components
  });
});
