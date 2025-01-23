// cypress/e2e/home.cy.js
describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the home page", () => {
    cy.contains("h2", "Find Dev Rooms").should("be.visible");
  });

  it('should have a "Create Room" button that links to the create room page', () => {
    cy.get("Button")
      .contains("Create Room")
      .should("be.visible")
      .and("have.attr", "href", "/create-room");
  });

  it('should display "No rooms available" when there are no rooms', () => {
    // Mock the UI state to simulate no rooms
    cy.contains("No rooms available").should("be.visible");
  });
});
