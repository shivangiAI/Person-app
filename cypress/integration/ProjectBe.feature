Feature: Project REST-API
    We want to check the reliability of our REST-API for project entity.

Scenario: User tries to create project
    Given User set POST project API endpoint
    When User sends a POST HTTP request to add the project
    Then User get successful response for "@addProjectData"

Scenario: User requests to get all projects
    Given User set GET all project API endpoint
    When User sends a GET HTTP request to get the projects
    Then User get successful response for "@allProjectResponse"
    And User receives an array of projects
    And Received array should contains all properties

Scenario: User requests to get project by Id
    Given User set GET project API endpoint
    When User sends a GET HTTP request to get the project
    Then User get successful response for "@projectResponse"
    And User receives an object of project

Scenario: User tries to update project
    Given User set PUT project API endpoint
    When User sends a PUT HTTP request to update the project
    Then User get successful response for "@projectUpdate"

Scenario: User tries to delete project
    Given User set DELETE project API endpoint
    When User sends a DELETE HTTP request to delete the project
    Then User get successful response for "@projectDelete"
