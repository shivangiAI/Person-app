import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import SignIn from "../../PageObject/SignIn";
import SignUp from "../../PageObject/SignUp";

const signUp = new SignUp();
Given("User navigate to SignUp page", () => {
    signUp.navigate(`/`)
});

When("User enters right SignUp credentials", () => {
    cy.intercept(
        {
            method: "POST",
            url: "api/Authenticate/register"
        },
        {
            statusCode: 200
        }
    ).as("signUpUser");

    cy.fixture("signUpInputs").then((signUpCred) => {
        signUp.fillForm(signUpCred.userName, signUpCred.email, signUpCred.password)
    });

    cy.get("[data-testid='SIGN_UP_BUTTON']").click();
    cy.wait("@signUpUser");
})

When("User enters wrong SignUp credentials", () => {
    signUp.fillForm("Shivangi", "notProperEmail", "notProperPass")
    cy.get("[data-testid='SIGN_UP_BUTTON']").click();
});

Then("All mandatory fields should be visible", () => {
    signUp.elements.userName().find('span').should('contain', 'User Name');
    signUp.elements.email().find('span').should('contain', 'Email');;
    signUp.elements.password().find('span').should('contain', 'Password');;
    signUp.elements.signUpBtn().find('span').should('contain', 'Signup');
    signUp.elements.signInLink().find('span').should('contain', 'Already have an account? Sign in');
});

Then("User should be Signed Up", () => {
    cy.visit('/SignIn')
});

Then("User should not be Signed Up", () => {
    cy.contains('Getting some error in Sign Up, Please try again.')    
})