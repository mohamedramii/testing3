import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import config from '../helpers/config.js'
import selectors from '../helpers/selectors.js';
import {faker} from '@faker-js/faker';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})


Then ('I scroll to the subscription section', () => {
    cy.get(selectors.subscriptionEmail).scrollIntoView()
})

Then ('I enter an email in the subscription section to subscibe', () => {

    let tempEmail = faker.internet.email()
    cy.get(selectors.subscriptionEmail).type(tempEmail)
    cy.get(selectors.subscriptionButton).click()

})

Then('I should see the subscription message {string}', (message) => {
    cy.get(selectors.subscriptionMessage).should('have.text', message)
})