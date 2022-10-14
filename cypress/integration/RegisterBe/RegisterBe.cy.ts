import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("User set POST register API endpoint", () => {
    cy.wrap("/api/Authenticate/register").as("register_endpoint");
});

When("User sends a POST HTTP request for registration", () => {
    cy.request("POST", "/api/Authenticate/register", {
        userName: "Test" + (Math.random() + 1),
        email: "test@gmail.com",
        password: "Test@123"
    }).as("registerResponse");
});

Then("User should successfully registered", () => {
    cy.get("@registerResponse").its("status").should("deep.equal", 200);
});

When("User sends a POST HTTP request for register with existing credentials", () => {
    cy.request({
        method: "POST",
        url: "/api/Authenticate/register",
        failOnStatusCode: false, 
        body: {
            username: "Test1",
            email: "test@gmail.com",
            password: "Test@123"
        }
    }).as("registerResponse")
});

Then("User got error in registration", () => {
    cy.get("@registerResponse").its("status").should('deep.equal', 500);
})