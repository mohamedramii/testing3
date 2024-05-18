Feature: Subscription Scenarios

    Scenario: User can subscibe
        Given I navigate to the demo webpage
        And I scroll to the subscription section
        When I enter an email in the subscription section to subscibe
        Then I should see the subscription message 'You have been successfully subscribed!'