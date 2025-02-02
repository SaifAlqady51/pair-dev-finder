import { defineConfig } from "cypress";
import fetch from "node-fetch";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        fetchRooms(statusCode) {
          return fetch("http://localhost:3000/api/rooms")
            .then(async (response) => {
              if (statusCode === 500) {
                throw new Error("Simulated server error");
              }
              return response.json().then((data) => data.data || []);
            })
            .catch(() => ({ error: "Failed to load rooms" }));
        },
      });

      return config;
    },
  },
});
