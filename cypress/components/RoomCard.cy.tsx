import RoomCard from "@/components/RoomCard";
import React from "react";

describe("<RoomCard />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <RoomCard
        room={{
          id: "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
          userId: "user_1234567890",
          name: "Awesome Coding Room",
          tags: "typescript,react,nodejs",
          githubRepo: "https://github.com/username/awesome-repo",
          description:
            "A collaborative space for building amazing projects with TypeScript and React!",
          created_at: new Date(),
        }}
      />,
    );
  });
});
