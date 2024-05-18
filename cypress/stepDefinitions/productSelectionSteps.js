import {Given, When, Then, DataTable} from '@badeball/cypress-cucumber-preprocessor';
import config from '../helpers/config.js'
import selectors from '../helpers/selectors.js';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

beforeEach(() => {
    cy.writeFile("cypress\\fixtures\\tempData.json", "")
})

When('I search for {string}', (productType) => {
    cy.get(selectors.searchBar).click()
    cy.get(selectors.searchBar).type(productType)
    cy.get(selectors.searchButton).click()
})

When('I view the product details', () => {
    cy.get(selectors.viewDetails).click()
})

When('I add the quantity as {string}', (number) => {
    cy.get(selectors.productQuantity).clear().type(number)
})

When('I add the product to the cart', () => {
    cy.get(selectors.addToCart).click()
})

When('I should see the {string} cart message {string}', (messageNo, messageText) => {
    switch(messageNo){
        case "1st": {
            cy.get(selectors.firstCartMessage).should('have.text', messageText)
            break
        }
        case "2nd": {
            cy.get(selectors.secondCartMessage).should('have.text', messageText)
            break
        }
        case "3rd":{
            cy.get(selectors.cartEmpty).should('have.text', messageText)
            break
        }
    }
})

When('I view the cart', () => {
    cy.get(selectors.viewCart).click()
})

//Clicking multiple elements and if the element is present
When('I clear the cart if there any products', () =>{
    cy.get('body').then(($body) => {
        if ($body.find(selectors.clearCart).length > 0) {
            cy.get(selectors.clearCart).click({ multiple: true })
        }
    })
})

Then('I should see the below in the cart', (datatable) => {
    datatable.hashes().forEach(element => {
        cy.get(selectors.cartDescription).should('have.text', element.Description)
        cy.get(selectors.cartPrice).should('have.text', element.Price)
        cy.get(selectors.cartQuantity).should('have.text', element.Quantity)
        cy.get(selectors.cartTotalPrice).should('have.text', element.TotalPrice)
    });
})

When('I clear the added item in the cart', () => {
    cy.get(selectors.clearCart).click()
})

When('I proceed to checkout', () => {
    cy.get(selectors.cartCheckout).click()
})

const prices = []
When('I note the price in the cart', () => {

    let parsedPrice
    cy.get(selectors.cartCheckoutTotalPrice).invoke('text').then((parsedPrice) => {
        parsedPrice = parsedPrice.substring(4)
        parsedPrice = parseInt(parsedPrice)
        prices.push(parsedPrice)
        cy.writeFile("cypress\\fixtures\\tempData.json", { TotalPrice: parsedPrice})
    })
})

//Clicking nth element
When('I clear no {string} item in the cart', (number) => {
    cy.get(selectors.clearCart).eq(parseInt(number)).click();

})

Then('I confirm that the price has {string}', (value) => {

    switch(value){
        case "increased":{
            cy.log(prices[0])
            cy.log(prices[1])
                    
            expect(prices[1]).to.be.greaterThan(prices[0])
            prices.length = 0
            break
        }
        case "decreased": {
            cy.log(prices[0])
            cy.log(prices[1])

            expect(prices[0]).to.be.greaterThan(prices[1])
            prices.length = 0
            break
        }
    }

})