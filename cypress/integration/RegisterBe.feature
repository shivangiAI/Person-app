Feature: Register Rest-API
    Check that user is successfully registered or not.

Scenario: User tries to Register
    Given User set POST register API endpoint
    When User sends a POST HTTP request for registration
    Then User should successfully registered

Scenario: User tries to Register with wrong credentials
    Given User set POST register API endpoint
    When User sends a POST HTTP request for register with existing credentials
    Then User got error in registration