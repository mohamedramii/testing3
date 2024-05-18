import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import config from '../helpers/config.js'
import selectors from '../helpers/selectors.js';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})


Then ('I should see the checkout message {string}', (message) => {
    cy.get(selectors.checkoutMessage).eq(0).should('have.text', message)
})

Then ('I proceed to login from the cart', () => {
    cy.get(selectors.checkoutLoginProceed).click()
})

Then('I scroll to the recommended items section', () => {
    cy.get(selectors.recommendedItems).scrollIntoView()
})

// Get index from list of elements and use it later
Then('I add {string} from the recommended items section', (item) => {
    
        cy.get(selectors.recommendedItemName).each(($ele, index) => {
            if($ele.text().includes(item)){
                cy.get(selectors.recommededAddToCart).eq(index).click({force:true})
            }
        })
})

Then('I continue shopping', () => {
    cy.get(selectors.continueShopping).click()
})

Then('I continue to the cart from the homepage', () => {
    cy.get(selectors.checkoutLoginProceed).click()
})