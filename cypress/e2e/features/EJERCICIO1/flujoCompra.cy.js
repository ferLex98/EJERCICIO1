

describe('Bloque_FlujoDeCompras', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('TC001_Flujo de compra con dos productos', () => {
    cy.fixture('agregarProducto').then((carrito)=>{
        cy.get(carrito.Producto1).click()
        cy.productoCarrito()
        cy.get(carrito.Producto2).click()
        cy.productoCarrito()
        cy.formCompra()
        cy.reload() 
    })
  })
  it('TC002_FALSO POSITIVO COMPRA EN 0', () => {
    cy.fixture('agregarProducto').then((carrito)=>{
        cy.formCompra()
        cy.get(carrito.alerta).contains(0)
        cy.log('Compra en 0')
        cy.reload() 
    })
  })





 
})
