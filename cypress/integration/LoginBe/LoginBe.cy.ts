import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("User set POST login API endpoint", () => {
    cy.wrap("/api/Authenticate/login").as('login_endpoint')
});

When("User sends a POST HTTP request for login", () => {
    cy.request("POST", "/api/Authenticate/login", {
        userName: "Shivangi",
        password: "Shivang@1234"
    }).as("loginResponse");
});

Then("User should successfully logged in", () => {
    cy.get("@loginResponse").its("status").should('deep.equal', 200);
});

When("User sends a POST HTTP request for login with wrong credentials", () => {
    cy.request({
        method:"POST",
        url: "/api/Authenticate/login",
        failOnStatusCode: false, 
        body: {
            userName: "test",
            password: "test"
        }
    }).as("loginResponse");
});

Then("User got error in logged in", () => {
    cy.get("@loginResponse").its("status").should('deep.equal', 401);
})