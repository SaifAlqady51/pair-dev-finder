describe("Create Room Page", () => {
  beforeEach(() => {
    cy.visit("/create-room");
  });
  it("should render the create room header", () => {
    cy.get("h1").should("contain", "Create a Room");
  });
  it("type inside Fields and submit if the user is not signed in", () => {
    cy.get('[data-cy="create-room-form-name-field"]').type("John Doe");
    cy.get('[data-cy="create-room-form-description-field"]').type(
      "Talk about your room purpose, goals, etc.",
    );

    cy.get('[data-cy="create-room-submit"]').should("be.visible").click();
    cy.contains("You have to sign in first").should("be.visible");
  });

  it("type inside Fields and submit if the user is signed in", () => {
    cy.get('[data-cy="header-login-link"]').should("be.visible").click();

    cy.get('[data-cy="login-email-field"]').type("saifalqady52@gmail.com");
    cy.get('[data-cy="login-password-field"]').type("Password1234#");
    cy.get('[data-cy="login-submit-button"]').should("be.visible").click();
    cy.get('[data-cy="create-room-button"]').click();

    cy.wait(2000);

    cy.get('[data-cy="create-room-form-name-field"]').type("John Doe");
    cy.get('[data-cy="create-room-form-description-field"]').type(
      "Talk about your room purpose, goals, etc.",
    );

    cy.get('[data-cy="create-room-submit"]').should("be.visible").click();
    cy.contains("Room Created").should("be.visible");
    cy.wait(2000);

    cy.reload();
  });
});
