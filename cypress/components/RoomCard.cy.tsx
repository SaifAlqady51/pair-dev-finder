import "../../src/app/globals.css";
import { RoomCard } from "@/components";
import React from "react";
import { getRepoName } from "@/utils/getRepoName";
import { Room } from "@/db/schema";

describe("<RoomCard />", () => {
  const room: Room = {
    id: "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
    userId: "user_1234567890",
    name: "Awesome Coding Room",
    keywords: [],
    githubRepo: "https://github.com/username/awesome-repo",
    description:
      "A collaborative space for building amazing projects with TypeScript and React!",
    created_at: new Date(),
    image:
      "https://media.mobidev.biz/2024/08/red-green-refactoring-2.jpg?strip=all&lossy=1&ssl=1",
  };

  beforeEach(() => {
    cy.mount(<RoomCard room={room} onJoinClick={() => { }} />);
  });

  it("renders the room card", () => {
    cy.get('[data-cy="room-card"]').should("exist");
  });

  it("renders the room name correctly", () => {
    cy.get('[data-cy="room-name"]').should("contain", room.name);
  });

  it("renders the room description correctly", () => {
    cy.get('[data-cy="room-description"]').should("contain", room.description);
  });

  it("renders the GitHub repo link correctly", () => {
    cy.get('[data-cy="github-repo-link"]')
      .should("have.attr", "href", room.githubRepo)
      .and("contain", getRepoName(room.githubRepo));
    cy.get('[data-cy="github-repo-link"] svg').should("exist");
  });

  it("renders the join button correctly", () => {
    cy.get('[data-cy="join-button"]').should("contain", "Join");
    cy.get('[data-cy="go-to-room-link"]').should(
      "have.attr",
      "href",
      `/rooms/${room.id}`,
    );
  });
});
