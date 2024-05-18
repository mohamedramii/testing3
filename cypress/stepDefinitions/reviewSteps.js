import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import config from '../helpers/config.js'
import selectors from '../helpers/selectors.js';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

When('I should see the {string} section', (review) => {
    cy.get(selectors.reviewSection).should('have.text', review)
    cy.get(selectors.reviewName).should('exist')
    cy.get(selectors.reviewEmail).should('exist')
    cy.get(selectors.reviewContent).should('exist')
})

When('I add the below review', (datatable) => {
    datatable.hashes().forEach(element => {
        cy.get(selectors.reviewName).type(element.Name)
        cy.get(selectors.reviewEmail).type(element.Email)
        cy.get(selectors.reviewContent).type(element.Review)
    })
})

When('I submit the review', () => {
    cy.get(selectors.reviewSubmit).click()
})

Then('I should see the review message {string}', (message) => {
    cy.get(selectors.reviewMessage).should('have.text', message)
})

When('I wait for {string} seconds', (time) => {
    cy.wait(parseInt(time) * 1000)
})

Then('I should not see the review message', () => {
    cy.get(selectors.reviewMessageHidden).should('exist')
})