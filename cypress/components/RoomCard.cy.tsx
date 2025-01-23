import React from "react";
import { mount } from "cypress/react";
import RoomCard from "@/components/RoomCard";
import { Room } from "@/db/schema";

describe("RoomCard Component", () => {
  const mockRoom: Room = {
    id: "1",
    userId: "3",
    created_at: new Date(),
    name: "Test Room",
    description: "This is a test room",
    tags: "tag1,tag2,tag3",
    githubRepo: "https://github.com/test/repo",
  };

  beforeEach(() => {
    mount(<RoomCard room={mockRoom} />);
  });

  it("should render the room name and description", () => {
    cy.get('[data-cy="room-name"]').should("contain", mockRoom.name);
    cy.get('[data-cy="room-description"]').should(
      "contain",
      mockRoom.description,
    );
  });

  it("should render the tags correctly", () => {
    mockRoom.tags.split(",").forEach((tag) => {
      cy.get('[data-cy="tag-list"]').should("contain", tag);
    });
  });

  it("should render the GitHub repo link if provided", () => {
    cy.get('[data-cy="github-repo-link"]')
      .should("have.attr", "href", mockRoom.githubRepo)
      .and("contain", "repo"); // Assuming getRepoName returns 'repo'
  });

  it('should navigate to the room page when the "Join" button is clicked', () => {
    cy.get('[data-cy="join-button"]').click();
    cy.url().should("include", `/rooms/${mockRoom.id}`);
  });
});
