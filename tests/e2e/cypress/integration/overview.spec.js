/// <reference types="Cypress" />
const CONTAINER = 'div[app-test-ref="container"]';
const VIDEO_TITLE = 'span[app-test-ref="vid-title"]';
const CLOCK_CONTAINER = 'div[app-test-ref="clock-container"]';

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5001/overview');
    });

    describe('Load and Video Title Assertions', () => {
        it('.should() - render page container and video titles', () => {
            // https://on.cypress.io/should
            cy.get(CONTAINER).should('be.visible');
            cy.get(CONTAINER)
                .find(VIDEO_TITLE)
                .first()
                .should('have.class', 'cam-name')
                .should('have.text', 'RAIL EAST');
            cy.get(CONTAINER)
                .find(VIDEO_TITLE)
                .last()
                .should('have.class', 'cam-name')
                .should('have.text', 'RAIL WEST');

            // for more information about asserting element's text
            // see https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element’s-text-contents
        });
    });

    describe('Timer/Clock is visible', () => {
        it('.should() - render clock', () => {
            // https://on.cypress.io/should
            cy.get(CLOCK_CONTAINER).should('be.visible');
            cy.get(CLOCK_CONTAINER)
                .children()
                .first()
                .should('have.class', 'label')
                .should('have.text', 'TIME');
            cy.get(CLOCK_CONTAINER)
                .children()
                .last()
                .should('have.class', 'timer')
                .should('not.be.empty');
        });
    });
});
