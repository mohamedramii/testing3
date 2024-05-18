Feature: Product Selection Scenarios

    Scenario: I can search for a product, select, checkout
        Given I navigate to the demo webpage
        And I click on 'login'
        And I login as a 'valid' user
        And I click on 'Cart'
        And I clear the cart if there any products
        And I click on 'Products'
        And I search for 'Men Tshirt'
        And I view the product details
        And I add the quantity as '3'
        And I add the product to the cart
        And I should see the '1st' cart message 'Added!'
        And I should see the '2nd' cart message 'Your product has been added to cart.'
        When I view the cart
        Then I should see the below in the cart
            | Description | Price   | Quantity | TotalPrice |
            | Men Tshirt  | Rs. 400 | 3        | Rs. 1200   |
        And I clear the added item in the cart
        Then I should see the '3rd' cart message 'Cart is empty!'

    Scenario: Price increases when a new item is added to the cart
        Given I navigate to the demo webpage
        And I click on 'login'
        And I login as a 'valid' user
        And I click on 'Cart'
        And I clear the cart if there any products
        And I click on 'Products'
        And I search for 'Blue Top'
        And I view the product details
        And I add the product to the cart
        And I view the cart
        And I proceed to checkout
        And I note the price in the cart
        And I click on 'Products'
        And I search for 'Winter Top'
        And I view the product details
        And I add the product to the cart
        And I view the cart
        And I proceed to checkout
        When I note the price in the cart
        Then I confirm that the price has 'increased'

    Scenario: Price decreases when a item is removed from the cart
        Given I navigate to the demo webpage
        And I click on 'login'
        And I login as a 'valid' user
        And I click on 'Cart'
        And I clear the cart if there any products
        And I click on 'Products'
        And I search for 'Blue Top'
        And I view the product details
        And I add the product to the cart
        And I view the cart
        And I click on 'Products'
        And I search for 'Winter Top'
        And I view the product details
        And I add the product to the cart
        And I view the cart
        And I proceed to checkout
        When I note the price in the cart
        And I click on 'Cart'
        And I clear no '1' item in the cart
        And I proceed to checkout
        When I note the price in the cart
        Then I confirm that the price has 'decreased'