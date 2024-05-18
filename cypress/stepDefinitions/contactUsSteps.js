import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import selectors from '../helpers/selectors.js';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})


Given('I fill the contact form with the below details', (datatable) => {
    datatable.hashes().forEach(element => {
        cy.get(selectors.contactUsName).type(element.Name)
        cy.get(selectors.contactUsEmail).type(element.Email)
        cy.get(selectors.contactUsSubject).type(element.Subject)
        cy.get(selectors.contactUsMessage).type(element.Message)
    });
})

When('I submit the contact form {string}', (successOrFail) => {
    switch (successOrFail) {
        case "successfully": {
            cy.get(selectors.contactUsSubmit).click()
            cy.on('window:confirm', () => true)
            break
        }
        case "unsuccessfully": {
            cy.get(selectors.contactUsSubmit).click()
            cy.on('window:confirm', () => false)
            break
        }
    }
})

When('I click on Ok in the popup', () => {

})

When('I click on Cancel in the popup', () => {
    cy.on('window:confirm', () => false)
})

Then('I should see the message in the contact us page {string}', (message) => {
    cy.get(selectors.contactUsSuccessMessage).should('have.text', message)
})

When('I should {string} the contact us form', (visibility) => {
    switch (visibility) {
        case "not see": {
            cy.get(selectors.contactUsName).should('not.exist')
            cy.get(selectors.contactUsEmail).should('not.exist')
            cy.get(selectors.contactUsSubject).should('not.exist')
            cy.get(selectors.contactUsMessage).should('not.exist')
            break
        }
        case "see": {
            cy.get(selectors.contactUsName).should('exist')
            cy.get(selectors.contactUsEmail).should('exist')
            cy.get(selectors.contactUsSubject).should('exist')
            cy.get(selectors.contactUsMessage).should('exist')
            break
        }

    }
})