Feature: SignUp Functionality
    I want to test SignUp functionality which includes SignUp success scenario.

Scenario: User should be able to see all input fields
    Given User navigate to SignUp page
    Then All mandatory fields should be visible

Scenario: User should be able to SignUp with right credentials
    Given User navigate to SignUp page
    When User enters right SignUp credentials
    Then User should be Signed Up

Scenario: User should be able to SignUp with wrong credentials
    Given User navigate to SignUp page
    When User enters wrong SignUp credentials
    Then User should not be Signed Up