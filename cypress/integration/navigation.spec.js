describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("li", "2 spots remaining")
      .click()
      .should("have.class", "day-list__item--selected");

  });
});

