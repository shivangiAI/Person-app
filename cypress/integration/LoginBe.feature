Feature: Login Rest-API
    Check that user is successfully Login or not.

Scenario: User tries to Login
    Given User set POST login API endpoint
    When User sends a POST HTTP request for login
    Then User should successfully logged in

Scenario: User tries to Login with wrong credentials
    Given User set POST login API endpoint
    When User sends a POST HTTP request for login with wrong credentials
    Then User got error in logged in