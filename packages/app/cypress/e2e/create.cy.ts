describe('Create Note Screen', () => {
  beforeEach(() => {
    cy.visit('/create'); // Adjust the path based on your app's routing
  });

  it('should create a new note', () => {
    cy.get('[data-testid="title-input"]').type('My New Note');
    cy.get('[data-testid="content-input"]').type('This is the content of the new note.');
    cy.get('[data-testid="save-note-button"]').click();

    cy.url().should('include', '/list');
  });

  it('should edit an existing note', () => {
    const noteId = Date.now();
    const note = { id: noteId, title: 'Existing Note', content: 'Some content' };
    localStorage.setItem('notes', JSON.stringify([note]));

    cy.visit(`/create?id=${noteId}`);
    cy.get('[data-testid="title-input"]').clear().type('Updated Note Title');
    cy.get('[data-testid="save-note-button"]').click();

    cy.url().should('include', '/list');
    cy.get('[data-testid="note-card"]').contains('Updated Note Title');
  });
});