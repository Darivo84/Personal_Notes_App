describe('List Note Screen', () => {
  beforeEach(() => {
    localStorage.setItem('notes', JSON.stringify([
      { id: 1, title: 'Note 1', content: 'Content 1' },
      { id: 2, title: 'Note 2', content: 'Content 2' },
    ]));
    cy.visit('/list'); 
  });

  it('should display all notes', () => {
    cy.get('[data-testid="note-card"]').should('have.length', 2);
  });

  it('should search for a note', () => {
    cy.get('[data-testid="search-input"]').type('Note 1');
    cy.get('[data-testid="note-card"]').should('have.length', 1);
    cy.get('[data-testid="note-title"]').contains('Note 1');
  });

  it('should delete a note', () => {
    cy.get('[data-testid="delete-note-button"]').first().click();
    cy.get('[data-testid="note-card"]').should('have.length', 1);
  });

  it('should navigate to create note screen', () => {
    cy.get('[data-testid="add-note-button"]').click();
    cy.url().should('include', '/create');
  });
});