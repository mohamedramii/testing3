Feature: GET API Scenarios

    Scenario: GET to all the products
        Given I do a GET call to the 'All Products' endpoint
        Then I should see the correct response for the 'All Products' endpoint

    Scenario: GET to all the brands
        Given I do a GET call to the 'All Brands' endpoint
        Then I should see the correct response for the 'All Brands' endpoint

    Scenario: POST to all the products
        Given I do a POST call to the 'All Products' endpoint
        Then I should see the unsupported response for the 'All Products' endpoint

    Scenario: POST to search product
        Given I do a POST call to the 'Search product' endpoint
        Then I should see the correct response for the 'Search product' endpoint