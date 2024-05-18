Feature: Login Scenarios

    Scenario: Valid user can login
        Given I navigate to the demo webpage
        And I click on 'login'
        When I login as a 'valid' user
        Then I should see the logged in message ' Logged in as CypressUser'

    Scenario: Invalid user cannot login
        Given I navigate to the demo webpage
        And I click on 'login'
        When I login as a 'invalid' user
        Then I should see the error message 'Your email or password is incorrect!'

    Scenario: Valid user can logout
        Given I navigate to the demo webpage
        And I click on 'login'
        When I login as a 'valid' user
        And I should see the logged in message ' Logged in as CypressUser'
        And I click on 'logout'
        Then I should see the demo login page