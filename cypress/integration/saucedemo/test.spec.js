/// <reference types="cypress" />
context('saucedemo.com', () => {
    it('logs in', () => {
        // Log in
        cy.visit('https://saucedemo.com');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce').type('{enter}');
        cy.wait(1000);

        // Verify page
        cy.get('.product_label').should('have.text', 'Products');

        // Add to cart
        cy.get('#inventory_container > div > div:nth-child(1) > div.pricebar > button')
            .click();
        cy.get('#shopping_cart_container > a > span').should('have.text', '1');

        // Open cart
        cy.get('#shopping_cart_container > a').click();
        cy.wait(1000);

        // Checkout
        cy.get('#cart_contents_container > div > div.cart_footer > a.btn_action.checkout_button').click();
        cy.get('#first-name').type('Adam');
        cy.get('#last-name').type('Reineke');
        cy.get('#postal-code').type('98052');
        cy.get('#checkout_info_container > div > form > div.checkout_buttons > input').click();
        cy.wait(1000);

        // Finish
        cy.get('#contents_wrapper > div.subheader').should('have.text', 'Checkout: Overview');
        cy.get('#checkout_summary_container > div > div.summary_info > div.cart_footer > a.btn_action.cart_button').click();
        cy.wait(1000);

        // Verify
        cy.get('#contents_wrapper > div.subheader').should('have.text', "Finish");
    });

});