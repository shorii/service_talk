describe('UpdatePage', () => {
    before(() => {
        cy.exec('(cd ../databases/postgres && flyway clean && flyway migrate)');
        cy.request('POST', '/api/talk/room', {
            name: 'room_name1',
            description: 'room_description1',
        });
    });
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-cy="HomeContainer-menu-0"]').click();
        cy.get('[data-cy="HomeContainer-edit"]').click();
    });
    it('test load', () => {
        cy.get('[data-cy="RoomForm-name"] input').should('have.value', 'room_name1');
        cy.get('[data-cy="RoomForm-description"] input').should('have.value', 'room_description1');
    });
    it('test press cancel button', () => {
        cy.get('[data-cy="Form-cancel"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
    it('test press submit button', () => {
        const updatedSuffix = '_updated';
        cy.get('[data-cy="RoomForm-name"]').type(updatedSuffix);
        cy.get('[data-cy="RoomForm-description"]').type(updatedSuffix);
        cy.get('[data-cy="Form-submit"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        cy.contains(`room_name1${updatedSuffix}`);
        cy.contains(`room_description1${updatedSuffix}`);
    });
});
