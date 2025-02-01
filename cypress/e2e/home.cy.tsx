describe("Home Page", () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit("/");
  });

  it('should display the "Find Dev Rooms" title', () => {
    // Check if the title is visible
    cy.get('[data-cy="find-dev-title"]')
      .should("be.visible")
      .and("have.text", "Find Dev Rooms");
  });

  it('should have a "Create Room" button that links to the create-room page', () => {
    // Check if the "Create Room" button is visible and has the correct link
    cy.get('a[href="/create-room"]')
      .should("be.visible")
      .and("contain", "Create Room");
  });

  it("should display an error message if fetching rooms fails", () => {
    // Intercept the API call and force it to fail
    cy.intercept("GET", "/api/rooms", {
      statusCode: 500,
      body: { error: "Failed to fetch rooms." },
    }).as("getRoomsFail");

    // Reload the page to trigger the API call
    cy.reload();

    // Check if the error message is displayed
    cy.contains("Failed to load rooms. Please try again later.").should(
      "be.visible",
    );
  });

  // it("should display a list of rooms if rooms are fetched successfully", () => {
  //   // Intercept the API call and return mock data
  //   cy.intercept("GET", "/api/rooms", {
  //     statusCode: 200,
  //     body: {
  //       data: [
  //         { id: 1, name: "Room 1", description: "Description 1" },
  //         { id: 2, name: "Room 2", description: "Description 2" },
  //       ],
  //     },
  //   }).as("getRoomsSuccess");
  //
  //   // Reload the page to trigger the API call
  //   cy.reload();
  //
  //   // Check if the room list is displayed
  //   cy.get('[data-cy="room-list"]').should("be.visible");
  //   cy.get('[data-cy="room-list"]').children().should("have.length", 2);
  // });

  it("should display a message if no rooms are available", () => {
    // Intercept the API call and return an empty list
    cy.intercept("GET", "/api/rooms", {
      statusCode: 200,
      body: { data: [] },
    }).as("getRoomsEmpty");

    // Reload the page to trigger the API call
    cy.reload();

    // Check if the "No rooms available" message is displayed
    cy.contains("No rooms available").should("be.visible");
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
    cy.reload();

    // Check if the room list is visible
    cy.get('[data-cy="room-list"]').should("be.visible");

    // Check if the rooms are displayed
    cy.contains("Room 1").should("be.visible");
    cy.contains("Room 2").should("be.visible");
  });
});
