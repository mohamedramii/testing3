Feature: Contact Us Scenarios

    Scenario: Feedback is submitted works when user submit a message
        Given I navigate to the demo webpage
        And I click on 'login'
        And I login as a 'valid' user
        And I should see the logged in message ' Logged in as CypressUser'
        And I click on 'Contact us'
        And I fill the contact form with the below details
            | Name     | Email              | Subject  | Message                     |
            | QATester | QAtester@gmail.com | Feedback | This is a wonderful website |
        When I submit the contact form 'successfully'
        Then I should see the message in the contact us page 'Success! Your details have been submitted successfully.'
        And I should 'not see' the contact us form

    Scenario: Feedback is not submitted when user cancels a message
        Given I navigate to the demo webpage
        And I click on 'login'
        And I login as a 'valid' user
        And I should see the logged in message ' Logged in as CypressUser'
        And I click on 'Contact us'
        And I fill the contact form with the below details
            | Name     | Email              | Subject  | Message                     |
            | QATester | QAtester@gmail.com | Feedback | This is a wonderful website |
        When I submit the contact form 'unsuccessfully'
        Then I should 'see' the contact us form