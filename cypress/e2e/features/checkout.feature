Feature: Product checkout Scenarios

    Scenario: I need to login to checkout
        Given I navigate to the demo webpage
        And I click on 'Products'
        And I search for 'Madame Top'
        And I view the product details
        And I add the product to the cart
        And I view the cart
        And I proceed to checkout
        And I should see the checkout message 'Register / Login account to proceed on checkout.'
        And I proceed to login from the cart
        And I login as a 'valid' user
        And I click on 'Cart'
        And I proceed to checkout
        And I note the price in the cart
        And I place the order
        When I enter the card details as below to confirm the order
            | Name         | CardNumber   | CVC | ExpirationMonth | ExpirationYear |
            | Cypress User | 110920986787 | 989 | 09              | 25             |
        And I should see the '1st' order message 'Order Placed!'
        And I should see the '2nd' order message 'Congratulations! Your order has been confirmed!'
        When I download the invoice
        Then I should see the invoice text

    Scenario: Cart is empty after purchase
        Given I navigate to the demo webpage
        And I click on 'login'
        And I login as a 'valid' user
        And I click on 'Products'
        And I search for 'Soft Stretch Jeans'
        And I view the product details
        And I add the product to the cart
        And I view the cart
        And I proceed to checkout
        And I place the order
        And I enter the card details as below to confirm the order
            | Name         | CardNumber   | CVC | ExpirationMonth | ExpirationYear |
            | Cypress User | 110920986787 | 989 | 09              | 25             |
        When I click on 'Cart'
        Then I should see the '3rd' cart message 'Cart is empty!'

    Scenario: I can add items from Recommended items
        Given I navigate to the demo webpage
        And I click on 'login'
        And I login as a 'valid' user
        And I click on 'Cart'
        And I clear the cart if there any products
        And I click on 'Home'
        And I scroll to the recommended items section
        And I add 'Blue Top' from the recommended items section
        And I continue shopping
        And I add 'Winter Top' from the recommended items section
        When I continue to the cart from the homepage
        And I proceed to checkout
        And I note the price in the cart
        And I place the order
        And I enter the card details as below to confirm the order
            | Name         | CardNumber   | CVC | ExpirationMonth | ExpirationYear |
            | Cypress User | 110920986787 | 989 | 09              | 25             |
        And I should see the '1st' order message 'Order Placed!'
        And I should see the '2nd' order message 'Congratulations! Your order has been confirmed!'
        When I download the invoice
        Then I should see the invoice text