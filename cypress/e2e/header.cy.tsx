describe("Header Component Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the header with icon and title", () => {
    cy.get("h3").contains("Dev Finder").should("be.visible").click();

    cy.url().should("include", "/");
    cy.get('img[alt="Icon"]').should("be.visible");
  });

  it("should show skeleton loaders while session is loading", () => {
    cy.intercept("GET", "/api/auth/session", { delay: 500, body: null });

    cy.get('[data-cy="skelatons"]').should("be.visible");
  });

  it("should display signing buttons when there is no session", () => {
    cy.intercept("GET", "/api/auth/session", { statusCode: 200, body: null });
    cy.reload();
    cy.get('[data-cy="log-in"]').should("be.visible").click();
    cy.url().should("include", "/authentication/login");
    cy.visit("/"); // return to homepage
    cy.get('[data-cy="register"]').should("be.visible").click();
    cy.url().should("include", "/authentication/register/verify-email");
  });

  it("should display profile when session exists", () => {
    const fakeSession = {
      user: {
        id: "7920f0d1-6a9f-415a-8fee-02715d81c6b7",
        name: "SaifAlqady",
        email: "saifalqady52@gmail.com",
        image: null,
      },
      expires: "2025-03-06T11:11:15.254Z",
    };

    cy.intercept("GET", "/api/auth/session", {
      statusCode: 200,
      body: fakeSession,
    });
    cy.reload();

    cy.contains("SaifAlqady").should("be.visible");
  });

  it("should have correct styles for title and button", () => {
    cy.viewport("iphone-6"); // Set viewport for mobile
    cy.get('[data-cy="find-dev-title"]')
      .should("be.visible")
      .and("contain", "Find Dev Rooms");
    cy.get("button").contains("Create Room").click();
    cy.url().should("include", "/create-room");
  });
});
