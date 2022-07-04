const PROJECT_ROOT = '..';
describe('The Home Page', () => {
    before(() => {
        cy.exec(`(cd ${PROJECT_ROOT}/databases/postgres && flyway clean && flyway migrate)`);
    });
    it('successfully loads', () => {
        cy.visit('/');
    });
});
