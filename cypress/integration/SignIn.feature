Feature: SignUp Functionality
    I want to test SignIn functionality which includes SignIn success/failure scenario.

Scenario: User should be able to see all input fields
    Given User navigate to SignIn page
    Then All mandatory fields should be visible

Scenario: User should be able to SignIn with right credentials
    Given User navigate to SignIn page
    When User enters right SignIn credentials
    Then User should be Signed In

Scenario: User should be able to SignIn with wrong credentials
    Given User navigate to SignIn page
    When User enters wrong SignIn credentials
    Then User should not be Signed In