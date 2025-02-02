import { Room } from "@/db/schema";

describe("Home Page", () => {
  beforeEach(() => {
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
  it("should display rooms fetched from the backend", () => {
    cy.task("fetchRooms", 200).then((rooms) => {
      expect(rooms).to.be.an("array");
      cy.wrap(rooms).each((room: Room, index) => {
        cy.get(`[data-cy="room-list"] > :nth-child(${index + 1})`).should(
          "contain",
          room.name,
        );
      });
    });
  });
});
