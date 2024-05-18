import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import config from '../helpers/config.js'
import selectors from '../helpers/selectors.js';
import {faker} from '@faker-js/faker';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})


Given('I register using an existing email', () => {
    cy.get(selectors.newUserName).type(config.validPassword)
    cy.get(selectors.newEmail).type(config.validUser)
    cy.get(selectors.newUserSubmit).click()
})

Then('I should see the message in register page {string}', (message) => {
    cy.get(selectors.newUserErrorMessage).should('have.text', message)
})

Then('I register using an new email', () => {

    let tempUserName = faker.internet.userName()
    let tempPassword = faker.internet.email()

    cy.get(selectors.newUserName).type(tempUserName)
    cy.get(selectors.newEmail).type(tempPassword)

    cy.writeFile("cypress\\fixtures\\tempData.json", { fakeUserName: tempUserName, fakePassword: tempPassword})

    cy.get(selectors.newUserSubmit).click()

    cy.get(selectors.newUserPassword).type(tempUserName)
    cy.get(selectors.newUserFirstName).type(tempUserName)
    cy.get(selectors.newUserLastName).type(tempUserName)
    cy.get(selectors.newUserAddress).type(tempUserName)
    cy.get(selectors.newUserCountry).select("Canada")
    cy.get(selectors.newUserState).type(tempUserName)
    cy.get(selectors.newUserCity).type(tempUserName)
    cy.get(selectors.newUserZipcode).type(tempUserName)
    cy.get(selectors.newUserMobile).type(tempUserName)

    cy.get(selectors.newUserCreate).click()
})

Then('I should see the {string} message in register page', (message) => {
    cy.get(selectors.newUserMessage).should('have.text', message)
})

Then('I continue to login with the new user' ,() => {
    cy.get(selectors.newUserContinue).click()
})

Then('I should see the {string} message in delete page', (message) => {
    cy.get(selectors.deletedUserMessage).should('have.text', message)
    cy.get(selectors.newUserContinue).click()
})