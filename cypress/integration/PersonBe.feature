Feature: Persons REST-API
    We want to check the reliability of our REST-API for persons entity.

Scenario: User tries to create person
    Given User set POST person API endpoint
    When User sends a POST HTTP request to add the person
    Then User get successful response for "@addPersonData"

Scenario: User requests to get all persons
    Given User set GET person API endpoint
    When User sends a GET HTTP request to get the persons
    Then User get successful response for "@allPersonResponse"
    And User receives an array of persons
    And Received array should contains all properties

Scenario: User requests to get person by Id
    Given User set GET person API endpoint
    When User sends a GET HTTP request to get the person
    Then User get successful response for "@personResponse"
    And User receives an object of person

Scenario: User tries to update person
    Given User set PUT person API endpoint
    When User sends a PUT HTTP request to update the person
    Then User get successful response for "@personUpdate"

Scenario: User tries to delete person
    Given User set DELETE person API endpoint
    When User sends a DELETE HTTP request to delete the person
    Then User get successful response for "@personDelete"
