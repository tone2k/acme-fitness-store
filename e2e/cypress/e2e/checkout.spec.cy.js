describe('ACME Fitness E2E Test', () => {

  before(() => {
    cy.visit('http://localhost:8090')
    cy.get('[data-cy=login-button]').click();
    cy.get('#username').type("user");
    cy.get('#password').type("password");
    cy.get('.btn').click();


  });

  it('Browses catalog adds bike to cart and completes checkout', () => {
    cy.get(':nth-child(13) > button').click()
    cy.get('[data-index="2"] > :nth-child(1) > div > a > img').click({force: true})
    cy.get('[data-cy=add-button]').click();
    cy.get('.css-m69qwo-MuiStack-root > [href="/catalog"]').click()
    cy.get(':nth-child(27) > .MuiPaper-root > .MuiButtonBase-root > .MuiStack-root').click()
    cy.get('[data-cy=add-button]').click();
    cy.get('[data-cy=assist-button]').click();
    cy.get('[data-cy=assist-input]').type("Tell me more about this Product.");
    cy.get('[data-cy=assist-send-button]').click();
    cy.wait(10000);
    cy.get('#assist-message-2').should('exist').and('contain.text', 'The Cyclone Xpress Cargo Trunk Bag')
    cy.get('[data-cy=assist-linked-product]').and('have.attr', 'href', '/product/ae640b1c-9379-40d1-bc2e-d9e4f86a3623')
    cy.get('[data-cy=assist-input]').type("Whats my cart total?");
    cy.get('[data-cy=assist-send-button]').click();
    cy.wait(10000)
    cy.get('#assist-message-4').should('exist').and('contain.text', 'Your current cart total is $')
    cy.get('[data-cy=assist-close]').click();
    cy.get('[data-cy=cart-button]').click();
    cy.get('[data-cy=checkout-button]').click();
    cy.get('#firstname').type("Michael");
    cy.get('#lastname').type("Smith");
    cy.get('#company').type("Acme Corp");
    cy.get('#street').type("121 Kennet Dr")
    cy.get('#email').type("michael.smith@example.com");
    cy.get('#phone').type("555-123-4567");
    cy.get('#city').type("New York");
    cy.get('#zip').type("10001");
    cy.get('[data-cy=delivery-button]').click();
    cy.get('[data-cy=express-button]').click();
    cy.get('[data-cy=payment-button]').click();
    cy.get('#cardnum').type("1234");
    cy.get('#ccv').type("225");
    cy.get('#expyear').click();
    cy.get('ul[role="listbox"]').contains('2024').click();
    cy.get('[data-cy=review-button]').click();
    cy.get('[data-cy=order-button]').click();
    cy.get('#orderMessage')
        .should('exist')
        .and('have.text', 'Your transaction was successfully processed');
  })

});