/// <reference types="Cypress" />
const CONTAINER = 'div[app-test-ref="container"]';
const EMPTY_CONTENT = 'span[app-test-ref="empty-content"]';
// const BOTTOM_BUTTONS_CONTAINER = 'div[app-test-ref="bottom-buttons-container"]';

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5001/training');
    });

    describe('Page loads approriately', () => {
        it('.should() - render page container and other thing', () => {
            cy.get(CONTAINER).should('be.visible');
        });
        it('determine if page content is intentionally empty', () => {
            cy.get(EMPTY_CONTENT).then(el => {
                if (el) {
                    cy.get(el[0]).should(
                        'have.text',
                        'THERE ARE NO UNCLASSIFIED EVENTS'
                    );
                }
            });
        });
    });
    // this fails if no events are loaded for classifying need to seed firestore (see cypress/firestore npm package)
    // before
    // describe('Classification buttons all render', () => {
    //     it('asserts 5 buttons are rendered', () => {
    //         cy.get(BOTTOM_BUTTONS_CONTAINER)
    //             .children()
    //             .should('have.length', 5);
    //     });
    // });
});
