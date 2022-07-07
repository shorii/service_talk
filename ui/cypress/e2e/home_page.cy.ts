describe('HomePage', () => {
    beforeEach(() => {
        cy.exec('(cd ../databases/postgres && flyway clean && flyway migrate)');
        cy.request('POST', '/api/talk/room', {
            name: 'room_name1',
            description: 'room_description1',
        });
        cy.request('POST', '/api/talk/room', {
            name: 'room_name2',
            description: 'room_description2',
        });
        cy.visit('/');
    });
    it('test load', () => {
        cy.contains('room_name1');
        cy.contains('room_description1');
        cy.contains('room_name2');
        cy.contains('room_description2');
    });
    it('test press create button', () => {
        cy.get('[data-cy="HomeContainer-create"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/room/create`);
    });
    it('test press edit button', () => {
        cy.get('[data-cy="HomeContainer-menu-0"]').click();
        cy.get('[data-cy="HomeContainer-edit"]').click();
        cy.url().should('match', /room\/.*\/update/);
        cy.get('[data-cy="RoomForm-name"] input').should('have.value', 'room_name1');
        cy.get('[data-cy="RoomForm-description"] input').should('have.value', 'room_description1');
    });
    it('test press delete button', () => {
        cy.get('[data-cy="HomeContainer-menu-0"]').click();
        cy.get('[data-cy="HomeContainer-delete"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        cy.contains('room_name1').should('not.exist');
        cy.contains('room_description1').should('not.exist');
    });
});
