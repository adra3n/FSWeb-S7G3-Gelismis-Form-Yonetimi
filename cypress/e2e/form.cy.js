context('Form test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Formu test et', () => {
    cy.get('#isim').type('Sertaç').should('have.value', 'Sertaç')
    cy.get('#email')
      .type('deneme@deneme.com')
      .should('have.value', 'deneme@deneme.com')
    cy.get('#sifre').type('deneme').should('have.value', 'deneme')
    cy.get('#kosullar').check()
  })
})
