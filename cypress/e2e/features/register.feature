Feature: Register Scenarios

    Scenario: Register using an existing email
        Given I navigate to the demo webpage
        And I click on 'login'
        When I register using an existing email
        Then I should see the message in register page 'Email Address already exist!'

    Scenario: Register and delete a user
        Given I navigate to the demo webpage
        And I click on 'login'
        And I register using an new email 
        And I should see the 'Account Created!' message in register page 
        And I continue to login with the new user
        And I click on 'Delete Account'
        And I should see the 'Account Deleted!' message in delete page 
        And I click on 'login'
        And I login as a 'deleted' user
        Then I should see the error message 'Your email or password is incorrect!'