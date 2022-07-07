describe('CreatePage', () => {
    before(() => {
        cy.exec('(cd ../databases/postgres && flyway clean && flyway migrate)');
    });
    beforeEach(() => {
        cy.visit('/room/create');
    });
    it('test press cancel button', () => {
        cy.get('[data-cy="Form-cancel"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
    it('test press submit button', () => {
        const inputName = 'test_name';
        const inputDescription = 'test_description';
        cy.get('[data-cy="RoomForm-name"]').type(inputName);
        cy.get('[data-cy="RoomForm-description"]').type(inputDescription);
        cy.get('[data-cy="Form-submit"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        cy.contains(inputName);
        cy.contains(inputDescription);
    });
});
