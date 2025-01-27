describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/"); // Visit the home page
  });

  it("should load the page and display the title", () => {
    cy.get('[data-cy="find-dev-title"]')
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

  it("should display a list of rooms if available", () => {
    // Mock the API response
    cy.intercept("GET", "/api/rooms", {
      statusCode: 200,
      body: [
        {
          id: "1",
          name: "Room 1",
          tags: "react,typescript",
          githubRepo: "https://github.com/example/repo1",
          description:
            "This is a bit long description for room 1 to see what this card looks like",
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Room 2",
          tags: "nodejs,express",
          githubRepo: "https://github.com/example/repo2",
          description: "This is room 2",
          created_at: new Date().toISOString(),
        },
      ],
    }).as("getRooms");

    // Wait for the API call to complete
    cy.wait("@getRooms");

    // Check if the room list is visible
    cy.get('[data-cy="room-list"]').should("be.visible");

    // Check if the rooms are displayed
    cy.contains("Room 1").should("be.visible");
    cy.contains("Room 2").should("be.visible");
  });
});
