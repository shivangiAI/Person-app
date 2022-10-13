import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import SignIn from "../../PageObject/SignIn";

const signIn = new SignIn();

Given("User navigate to SignIn page", () => {
    signIn.navigate('/SignIn');
});

When("User enters right SignIn credentials", () => {
    cy.intercept(
        {
            method: "POST",
            url: "api/Authenticate/login"
        },
        {
            statusCode: 200
        }
    ).as("signInUser");

    cy.fixture("signInInputs").then((signInCred) => {
        signIn.fillForm(signInCred.userName, signInCred.password);
    });

    signIn.elements.signInBtn().click();
    cy.wait("@signInUser");
})

When("User enters wrong SignIn credentials", () => {
    signIn.fillForm("Shivangi", "notProperPass");
    signIn.elements.signInBtn().click();
});

Then("All mandatory fields should be visible", () => {
    signIn.elements.userName().find('span').should('contain', 'User Name');
    signIn.elements.password().find('span').should('contain', 'Password');;
    signIn.elements.signInBtn().find('span').should('contain', 'Sign In');
});

Then("User should be Signed In", () => {
    signIn.navigate('/Home')
});

Then("User should not be Signed In", () => {
    cy.contains('Getting some error in Sign In, Please try again.')    
})