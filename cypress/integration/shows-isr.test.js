describe("ISR cache test with a build time data.", () => {
  it("skip client-side bundle to confirm data from the cache", () => {
    cy.request("/shows").its("body").then(html => {
      //remove JS scripts so they don't start automatically
      const staticHtml = html.replace(/<scripts .*?>.*?<\/scripts>/gm, "");
      cy.state("document").write(staticHtml);
    });
  
    cy.findAllByText(/2022 apr 1[567]/i).should("have.length.of", 3);
  });
});