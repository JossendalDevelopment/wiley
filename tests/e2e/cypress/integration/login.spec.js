/// <reference types="Cypress" />
const EMAIL_INPUT = 'div[app-test-ref="employee-email"] > div > div > div > input';
const PASSWORD_INPUT = 'div[app-test-ref="password"] > div > div > div > input';
const LOGIN_BTN = 'button[app-test-ref="login-btn"]';
const REMEMBER_CHECKBOX = 'div[app-test-ref="remember-checkbox"] > div > div > div > input'

context('Actions', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5001/sign_in')
    })
  
    // https://on.cypress.io/interacting-with-elements
  
    it('.type() - type into Email input', () => {
      // https://on.cypress.io/type
      cy.get(EMAIL_INPUT)
        .type('fake@email.com').should('have.value', 'fake@email.com')
  
        // .type() with special character sequences
        .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
        .type('{del}{selectall}{backspace}')
  
        // .type() with key modifiers
        .type('{alt}{option}') //these are equivalent
        .type('{ctrl}{control}') //these are equivalent
        .type('{meta}{command}{cmd}') //these are equivalent
        .type('{shift}')
  
        // Delay each keypress by 0.1 sec
        .type('slow.typing@email.com', { delay: 100 })
        .should('have.value', 'slow.typing@email.com')
    })

    it('.type() - type into Password input', () => {
      // https://on.cypress.io/type
      cy.get(PASSWORD_INPUT)
        .type('fakepassword').should('have.value', 'fakepassword')
  
        // .type() with special character sequences
        .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
        .type('{del}{selectall}{backspace}')
  
        // .type() with key modifiers
        .type('{alt}{option}') //these are equivalent
        .type('{ctrl}{control}') //these are equivalent
        .type('{meta}{command}{cmd}') //these are equivalent
        .type('{shift}')
  
        // Delay each keypress by 0.1 sec
        .type('slow.password', { delay: 100 })
        .should('have.value', 'slow.password')
    })

    it('.clear() - clears Email input element', () => {
      // https://on.cypress.io/clear
      cy.get(EMAIL_INPUT).type('Clear this text')
        .should('have.value', 'Clear this text')
        .clear()
        .should('have.value', '')
    })
  
    it('.clear() - clears Password input element', () => {
      // https://on.cypress.io/clear
      cy.get(PASSWORD_INPUT).type('Clear this text')
        .should('have.value', 'Clear this text')
        .clear()
        .should('have.value', '')
    })

    it('.check() - click on checkbox element', () => {
      // https://on.cypress.io/click
      cy.get(REMEMBER_CHECKBOX)
        .click({ force: true })
        .should('have.attr', 'aria-checked', 'true')
    })
  
    it('.submit() - login action', () => {
      // https://on.cypress.io/submit
      cy.get(EMAIL_INPUT)
        .type('admin@email.com').should('have.value', 'admin@email.com')
      cy.get(PASSWORD_INPUT)
        .type('password').should('have.value', 'password')
      cy.get(LOGIN_BTN)
        .click()
      cy.url()
        .should('include', '/overview')
    })
  
    // it('.check() - check a checkbox or radio element', () => {
    //   // https://on.cypress.io/check
  
    //   // By default, .check() will check all
    //   // matching checkbox or radio elements in succession, one after another
    //   cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
    //     .check().should('be.checked')
  
    //   cy.get('.action-radios [type="radio"]').not('[disabled]')
    //     .check().should('be.checked')
  
    //   // .check() accepts a value argument
    //   cy.get('.action-radios [type="radio"]')
    //     .check('radio1').should('be.checked')
  
    //   // .check() accepts an array of values
    //   cy.get('.action-multiple-checkboxes [type="checkbox"]')
    //     .check(['checkbox1', 'checkbox2']).should('be.checked')
  
    //   // Ignore error checking prior to checking
    //   cy.get('.action-checkboxes [disabled]')
    //     .check({ force: true }).should('be.checked')
  
    //   cy.get('.action-radios [type="radio"]')
    //     .check('radio3', { force: true }).should('be.checked')
    // })
  
    // it('.uncheck() - uncheck a checkbox element', () => {
    //   // https://on.cypress.io/uncheck
  
    //   // By default, .uncheck() will uncheck all matching
    //   // checkbox elements in succession, one after another
    //   cy.get('.action-check [type="checkbox"]')
    //     .not('[disabled]')
    //     .uncheck().should('not.be.checked')
  
    //   // .uncheck() accepts a value argument
    //   cy.get('.action-check [type="checkbox"]')
    //     .check('checkbox1')
    //     .uncheck('checkbox1').should('not.be.checked')
  
    //   // .uncheck() accepts an array of values
    //   cy.get('.action-check [type="checkbox"]')
    //     .check(['checkbox1', 'checkbox3'])
    //     .uncheck(['checkbox1', 'checkbox3']).should('not.be.checked')
  
    //   // Ignore error checking prior to unchecking
    //   cy.get('.action-check [disabled]')
    //     .uncheck({ force: true }).should('not.be.checked')
    // })
  
})
  