import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import config from '../helpers/config.js'
import selectors from '../helpers/selectors.js';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})


// Below 2 methods, show how we can store something in a variable and then reuse it in another place
let responseCodeFromAPI;
let responseBodyFromAPI;
Given ('I do a GET call to the {string} endpoint', (endpoint) => {

    switch(endpoint){
        case "All Products": {
            cy.request('GET', 'https://automationexercise.com/api/productsList').then((response) =>{
                responseCodeFromAPI = "Response Status is "+ response.status
                responseBodyFromAPI = JSON.stringify(response.body)
            })
            break
        }
        case "All Brands": {
            cy.request('GET', 'https://automationexercise.com/api/brandsList').then((response) =>{
                responseCodeFromAPI = "Response Status is "+ response.status
                responseBodyFromAPI = JSON.stringify(response.body)
            })
            break
        }
    }
})

Then('I should see the correct response for the {string} endpoint', (endpoint) => {

    switch(endpoint){
        case "All Products":{
            expect(responseCodeFromAPI).to.contain('Response Status is 200')
            expect(responseBodyFromAPI).to.contain('Blue Top')
            expect(responseBodyFromAPI).length.to.be.greaterThan(1)
            break
        }
        case "All Brands":{
            expect(responseCodeFromAPI).to.contain('Response Status is 200')
            expect(responseBodyFromAPI).to.contain('Babyhug')
            expect(responseBodyFromAPI).length.to.be.greaterThan(1)
            break
        }
        case "Search product": {
            expect(responseCodeFromAPI).to.contain('Response Status is 200')
            expect(responseBodyFromAPI).to.contain('Panda')
            expect(responseBodyFromAPI).length.to.be.greaterThan(1)
        }
    }
})

Given('I do a POST call to the {string} endpoint', (endpoint) => {

    switch(endpoint){
        case "All Products": {
            cy.request('POST', 'https://automationexercise.com/api/productsList').then((response) =>{
                responseCodeFromAPI = "Response Status is "+ response.status
                responseBodyFromAPI = JSON.stringify(response.body)
            })
            break
        }
        case "Search product":{
            cy.request({method: 'POST', url: 'https://automationexercise.com/api/searchProduct', form: true, body: {search_product: 'top'}}).then((response) => {
                responseCodeFromAPI = "Response Status is "+ response.status
                responseBodyFromAPI = JSON.stringify(response.body)
            })
        }
        break
    }
})

Then('I should see the unsupported response for the {string} endpoint', (endpoint) => {

    switch(endpoint){
        case "All Products":{
            expect(responseBodyFromAPI).to.contain('405')
            expect(responseBodyFromAPI).to.contain('This request method is not supported.')
            expect(responseBodyFromAPI).length.to.be.greaterThan(1)
        }
    }
})

