import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

let personId: Number;

Given("User set POST person API endpoint", () => {
    cy.wrap('/api/Person').as('person');
});

When('User sends a POST HTTP request to add the person', () => {
    cy.fixture('addPerson').then((person) => {
        cy.request("POST", "api/Person", person).as('addPersonData');
    })
});

Then('User get successful response for {string}', (alias: string) => {
    cy.get(alias).its('status').should('deep.equal', 200);
});

Given("User set GET person API endpoint", () => {
    cy.wrap('/persons').as('allPersons');
});

When('User sends a GET HTTP request to get the persons', () => {
    cy.request("GET", "/persons").as('allPersonResponse');
    cy.get('@allPersonResponse').then((persons: any) => {
        console.log('persons: ', persons);
        const length = persons.body.length - 1;
        personId = persons.body[length].personId;
        console.log('personId: ', personId);
    })
});

Then('User receives an array of persons', () => {
    expect(Array.isArray(cy.get('@allPersonResponse').its('body')));
});

Then("Received array should contains all properties", () => {
    cy.fixture("PersonProperties").then((persons) => {
        Object.keys(persons).forEach((property) => {
            cy.get('@allPersonResponse').its('body').its(0).should('have.a.property', property)
        });
    });
});

Given("User set GET person API endpoint", () => {
    cy.wrap(`/persons/personId?personId=${personId}`).as('person');
});

When("User sends a GET HTTP request to get the person", () => {
    cy.request("GET", '/persons/personId?personId=5').as('personResponse');
});

Then("User receives an object of person", () => {
    expect(cy.get('@personResponse').its('body'));
});

Given("User set DELETE person API endpoint", () => {
    cy.wrap(`/api/Person?id=${personId}`).as('person');
});

When("User sends a DELETE HTTP request to delete the person", () => {
    cy.request("DELETE", `/api/Person?id=${personId}`).as('personDelete');
});
