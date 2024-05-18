Feature: Review Scenarios

    Scenario: User can leave reviews
        Given I navigate to the demo webpage
        And I click on 'login'
        And I login as a 'valid' user
        And I click on 'Products'
        And I search for 'Stylish Dress'
        And I view the product details
        And I should see the 'Write Your Review' section
        When I add the below review
            | Name         | Email                    | Review         |
            | Cypress Name | cypressemail@cypress.com | Cypress Review |
        And I submit the review
        Then I should see the review message 'Thank you for your review.'
        And I wait for '5' seconds
        Then I should not see the review message 