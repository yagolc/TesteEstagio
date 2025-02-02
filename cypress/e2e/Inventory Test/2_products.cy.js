import { users, url } from './Mock';
import { doSignIn } from './Utils';

describe('Inventory - Products', () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);
  });

  it('Should see the product details and add to cart', () => {
    
    cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]').click();
    cy.contains('Sauce Labs Backpack');
    cy.get('[data-test="add-to-cart"]').click();

    cy.get('[data-test="shopping-cart-link"]').click();
    cy.contains('Your Cart');
    cy.contains('Sauce Labs Backpack');

  });

  it('Should sort products by price properly (high to low)', () => {
    cy.get('[data-test="product-sort-container"]').select('Price (high to low)');

    cy.get('.inventory_item_price')
      .then(($prices) => {
        const originalPrices = [...$prices].map(price => 
          parseFloat(price.innerText.replace('$', ''))
        );

        const sortedPrices = [...originalPrices].sort((a, b) => b - a);
        expect(originalPrices).to.deep.equal(sortedPrices);
      })
  });

  it('Should sort products by price properly (low to high)', () => {
    cy.get('[data-test="product-sort-container"]').select('Price (low to high)');

    cy.get('.inventory_item_price')
      .then(($prices) => {
        const originalPrices = [...$prices].map(price => 
          parseFloat(price.innerText.replace('$', ''))
        );

        const sortedPrices = [...originalPrices].sort((a, b) => a - b);
        expect(originalPrices).to.deep.equal(sortedPrices);
      })
  });
});
