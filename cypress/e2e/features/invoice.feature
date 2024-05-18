Feature: Invoice Scenarios

    Scenario: User gets the invoice to the purchase that's made
        Given I navigate to the demo webpage
        And I click on 'login'
        And I login as a 'valid' user
        #And I click on 'Cart'
        #And I clear the cart if there any products
        And I click on 'Products'
        And I search for 'Frozen Tops'
        And I view the product details
        And I add the quantity as '10'
        And I add the product to the cart
        And I view the cart
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