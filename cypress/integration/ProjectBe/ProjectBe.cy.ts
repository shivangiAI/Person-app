import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

let projectId: number;

Given("User set POST project API endpoint", () => {
    cy.wrap('/api/Project').as('project');
});

When('User sends a POST HTTP request to add the project', () => {
    cy.fixture('addProject').then((project) => {
        cy.request("POST", "api/Project", project).as('addProjectData');
    })
});

Then('User get successful response for {string}', (alias: string) => {
    cy.get(alias).its('status').should('deep.equal', 200);
});

Given("User set GET all project API endpoint", () => {
    cy.wrap('/projects').as('allPersons');
});

When('User sends a GET HTTP request to get the projects', () => {
    cy.request("GET", "/projects").as('allProjectResponse');
    cy.get('@allProjectResponse').then((projects: any) => {
        
        const length = projects.body.length - 1;
        projectId = projects.body[length].projectId;
        
    })
});

Then('User receives an array of projects', () => {
    expect(Array.isArray(cy.get('@allProjectResponse').its('body')));
});

Then("Received array should contains all properties", () => {
    cy.fixture("ProjectProperties").then((projects) => {
        Object.keys(projects).forEach((property) => {
            cy.get('@allProjectResponse').its('body').its(0).should('have.a.property', property)
        });
    });
});

Given("User set GET project API endpoint", () => {
    cy.wrap(`/projects/projectId?id=${projectId}`).as('project');
});

When("User sends a GET HTTP request to get the project", () => {
    cy.request("GET", `/projects/projectId?id=${projectId}`).as('projectResponse');
});

Then("User receives an object of project", () => {
    expect(cy.get('@projectResponse').its('body'));
});

Given("User set PUT project API endpoint", () => {
    cy.wrap('/api/Project').as('project');
});

When("User sends a PUT HTTP request to update the project", () => {
    cy.fixture('updateProject').then((project) => {
        cy.request("PUT", "api/Project", project).as('projectUpdate');
    });
});

Given("User set DELETE project API endpoint", () => {
    cy.wrap(`/api/Project?projectId=${projectId}`).as('project');
});

When("User sends a DELETE HTTP request to delete the project", () => {
    cy.request("DELETE", `/api/Project?projectId=${projectId}`).as('projectDelete');
});
