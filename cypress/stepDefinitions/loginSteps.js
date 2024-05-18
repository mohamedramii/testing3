import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import config from '../helpers/config.js'
import selectors from '../helpers/selectors.js';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})


Given('I navigate to the demo webpage', () => {
    cy.visit('/')
})

When('I click on {string}', (userAction) => {
    switch(userAction){
        case "login":
        case "logout":{
            cy.get(selectors.loginPage).click()
            break
        }
        case "Products":{
            cy.get(selectors.productsPage).click()
            break
        }
        case "Contact us":{
            cy.get(selectors.contactUsPage).click()
            break
        }
        case "Delete Account":{
            cy.get(selectors.deleteAccount).click()
            break
        }
        case "Cart":{
            cy.get(selectors.cartPage).click()
            break
        }
        case "Home":{
            cy.get(selectors.homePage).click()
            break
        }
    }
})

When('I login as a {string} user', (userType) => {

    switch(userType){
        case "valid": {
            cy.get(selectors.userName).type(config.validUser)
            cy.get(selectors.password).type(config.validPassword)
            break
        }
        case "invalid":{
            cy.get(selectors.userName).type(config.validUser)
            cy.get(selectors.password).type(config.invalidPassword)
            break
        }
        case "deleted":{
            cy.fixture('tempData.json').then(tempData => {
                cy.get(selectors.userName).type(tempData.fakePassword)
                cy.get(selectors.password).type(tempData.fakeUserName)
            })
            break
        }
    }
    cy.get(selectors.submit).click()
})

Then ('I should see the logged in message {string}', (accountNameFromBDD) => {
    cy.get(selectors.accountName).should('have.text', accountNameFromBDD)
})

Then ('I should see the demo login page', () => {
    cy.get(selectors.userName).should('exist')
    cy.get(selectors.password).should('exist')
})

Then('I should see the error message {string}', (errorFromBDD) => {
    cy.get(selectors.errorMessage).should('have.text', errorFromBDD)
})