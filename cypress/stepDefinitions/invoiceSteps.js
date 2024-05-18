import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import config from '../helpers/config.js'
import selectors from '../helpers/selectors.js';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

When('I place the order', () => {
    cy.get(selectors.placeOrderButton).click()
})

When('I enter the card details as below to confirm the order', (datatable) => {
    datatable.hashes().forEach(element => {
        cy.get(selectors.placeOrderCardName).type(element.Name)
        cy.get(selectors.placeOrderCardNumber).type(element.CardNumber)
        cy.get(selectors.placeOrderCVC).type(element.CVC)
        cy.get(selectors.placeOrderExpiryMonth).type(element.ExpirationMonth)
        cy.get(selectors.placeOrderExpiryYear).type(element.ExpirationYear)

        cy.get(selectors.placeOrderPayButton).click()
    });
})

When('I should see the {string} order message {string}', (messageNo, messageText) =>{

    switch(messageNo){
        case "1st": {
            cy.get(selectors.firstOrderMessage).should('have.text', messageText)
            break
        }
        case "2nd": {
            cy.get(selectors.secondOrderMessage).should('have.text', messageText)
            break
        }
    }
})

When('I download the invoice', () => {

    cy.window().document().then(function (doc) {
        doc.addEventListener('click', () => {
          // this adds a listener that reloads your page 
          // after 5 seconds from clicking the download button
          setTimeout(function () { doc.location.reload() }, 5000)
        })
        cy.get(selectors.downloadInvoiceButton).click()
      })
})

//Reading from Fixture File 2 ways
Then('I should see the invoice text', () => {

    cy.readFile("cypress\\fixtures\\tempData.json").then(priceFromUI => {
        let invoiceMessage = "Hi " + config.userNameInInvoice + ", Your total purchase amount is " + priceFromUI.TotalPrice + ". Thank you"
        cy.readFile("cypress\\downloads\\invoice.txt").should('contain', invoiceMessage)
    })


    // cy.fixture('tempData.json').then(tempData => {
    //     let priceFromUI = tempData.TotalPrice
    //     let invoiceMessage = "Hi " + config.userNameInInvoice + ", Your total purchase amount is " + priceFromUI + ". Thank you"
    //     cy.readFile("cypress\\downloads\\invoice.txt").should('contain', invoiceMessage)
    // })
})