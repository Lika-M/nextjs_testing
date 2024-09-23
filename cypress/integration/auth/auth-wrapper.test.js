const email = Cypress.env("TEST_USER_EMAIL");
const password = Cypress.env("TEST_PASSWORD");
console.log

describe("Test auth wrapper", () => {
  it("runs auth flow for successful login to protected 'reservations' page", () => {
    // Visit reservations page for the first show (id: 0)
    cy.task("db:reset").visit("/reservations/0");

    // check for sign-in form
    // and that's no option to purchase tickets
    cy.findByRole("heading", { name: /Sign in to your account/i }).should("exist");
    cy.findByRole("button", { name: /purchase/i }).should("not.exist");


    //enter valid credentials and submit the form
    cy.findByLabelText(/email address/i)
      .clear()
      .type(email);

    cy.findByLabelText(/password/i)
      .clear()
      .type(password);

    cy.findByRole("main").within(() => {
      cy.findByRole("button", { name: /sign in/i }).click().wait(2000);
    });

    //check for the band name and purchase button
    cy.findByRole("heading", { name: /The Wandering Bunnies/i }).should("exist");
    cy.findByRole("button", { name: /purchase/i }).should("exist");

    //check for user email and sign-out button on the navbar
    cy.findByText(email).should("exist");
    cy.findByRole("button", { name: /sign out/i }).should("exist");
  });


  it("failure flow of visiting protected 'user' page followed by successful login", () => {
    // Reset db and visit protected user page
    cy.task("db:reset").visit("/user");
    cy.findByRole("heading", { name: /Sign in to your account/i }).should("exist");
    cy.findByRole("heading", { name: /welcome/i }).should("not.exist");

    // Attempt sign in with invalid email format and check for error message
    cy.findByLabelText(/email address/i).clear().type("test@test@asdasd");
    cy.findByLabelText(/password/i).clear().type(password);
    cy.findByRole("main").within(() => {
      cy.findByRole("button", { name: /sign in/i }).click();
    });
    cy.findByText(/Sign in failed/i).should("exist");

    // Attempt sign in with correct email but wrong password
    cy.findByLabelText(/email address/i).clear().type(email);
    cy.findByLabelText(/password/i).clear().type("asdasd");
    cy.findByRole("main").within(() => {
      cy.findByRole("button", { name: /sign in/i }).click();
    });
    cy.findByText(/Sign in failed/i).should("exist");

    // Successful login should redirect to the originally requested page '/user'
    cy.findByLabelText(/email address/i).clear().type(email);
    cy.findByLabelText(/password/i).clear().type(password);
    cy.findByRole("main").within(() => {
      cy.findByRole("button", { name: /sign in/i }).click();
    });

    // Validate that user is redirected to the user dashboard with purchase options
    cy.findByRole("heading", { name: /Welcome test@test.test/i }).should("exist");
    cy.findByRole("heading", { name: /Your Tickets/i }).should("exist");
    cy.findByRole("button", { name: /purchase more tickets/i }).should("exist");

    // Ensure user is signed in and can sign out
    cy.findByRole("button", { name: /sign in/i }).should("not.exist");
    cy.findByRole("button", { name: /sign out/i }).should("exist");
  });

});

describe("Parametrized tests with Fixures", () => {
  it("redirects to sign-in page for all protected pages", () => {
    cy.fixture("protected-pages.json").then((urls) => {
      urls.forEach(($url) => {
        cy.visit($url);
        cy.findByLabelText(/email address/i).should("exist");
        cy.findByLabelText(/password/i).should("exist");
      });
    });
  });

});

describe("Test Authenticating programmatically", () => {
  it("does not show sign-in page when already signed in.", () => {
    cy.task("db:reset");
    cy.signIn(email, password);

    //access reservations page for the first show
    cy.visit("/reservations/0");
    //make sure there is no sign-in page
    cy.findByRole("heading", { name: /sign in to your account/i }).should("not.exist");
    // and ticket purchase button is shown
    cy.findByRole("main").within(() => {
      cy.findByRole("button", { name: /purchase/i }).should("exist");
    })
  });
});