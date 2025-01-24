describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/"); // Visit the home page
  });

  it("should load the page and display the title", () => {
    cy.get('[data-testid="find-dev-title"]')
      .should("be.visible")
      .and("contain.text", "Find Dev Rooms");
  });

  it('should display "Create Room" button and navigate correctly', () => {
    cy.get("button").contains("Create Room").should("be.visible").click();
    cy.url().should("include", "/create-room");
  });

  it('should display "No rooms available" message when no rooms', () => {
    cy.intercept("GET", "/api/rooms", []).as("getEmptyRooms"); // Mock empty rooms
    cy.visit("/");
    cy.get("p").contains("No rooms available").should("be.visible");
  });

  it("should display rooms when rooms are available", () => {
    cy.intercept("GET", "/api/rooms", { fixture: "rooms.json" }).as("getRooms"); // Mock API call
    cy.wait("@getRooms"); // Wait for the mocked API response
    cy.get('[data-testid="room-list"]')
      .should("exist")
      .within(() => {
        cy.get(".RoomCard").should("have.length", 3); // Assuming rooms.json has 3 rooms
      });
  });
});
