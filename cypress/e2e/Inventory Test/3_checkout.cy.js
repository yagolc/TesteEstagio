import { users, url } from "./Mock";
import { doSignIn } from "./Utils";

describe("Inventory - Products", () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);    
  });

  it("Should do checkout with the correct flow", () => {

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    cy.get('[data-test="shopping-cart-link"]').click();

    cy.contains('Your Cart');
    cy.contains('Sauce Labs Backpack');
    cy.contains('Sauce Labs Bike Light');
    cy.get('[data-test="checkout"]').click();

    cy.contains('Checkout: Your Information');
    cy.get('[data-test="firstName"]').type('Francisco');
    cy.get('[data-test="lastName"]').type('Almeida');
    cy.get('[data-test="postalCode"]').type('90000');
    cy.get('[data-test="continue"]').click();

    cy.contains('Checkout: Overview');
    cy.get('[data-test="finish"]').click();
    cy.contains('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  });

  it("Should select some products, go to cart, and go back to continue shopping", () => {
    
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    cy.get('[data-test="shopping-cart-link"]').click();

    cy.contains('Your Cart');
    cy.contains('Sauce Labs Backpack');
    cy.contains('Sauce Labs Bike Light');
    cy.get('[data-test="continue-shopping"]').click();

    cy.contains('Products');
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  });

  it("Should not continue checkout with empty delivery information", () => {

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    cy.get('[data-test="shopping-cart-link"]').click();

    cy.contains('Your Cart');
    cy.contains('Sauce Labs Backpack');
    cy.contains('Sauce Labs Bike Light');
    cy.get('[data-test="checkout"]').click();

    cy.contains('Checkout: Your Information');

    cy.get('[data-test="firstName"]').type('Francisco');
    cy.get('[data-test="lastName"]').type('Almeida');
    cy.get('[data-test="continue"]').click();

    cy.contains('Error: Postal Code is required');

    
  });
});