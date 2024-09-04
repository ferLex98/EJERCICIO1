// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const datosCliente = require('../data/frmIngresoClienteCompra.json')

Cypress.Commands.add('productoCarrito', ()=>{
    cy.fixture('agregarProducto').then((carrito)=>{
        cy.get(carrito.btnAgregarProducto).click()
        cy.valRespuesta('OPTIONS','cart_url_api',200)
        cy.wait(2500)
        cy.visit('/')

    })
})

Cypress.Commands.add('formCompra', ()=>{
    cy.fixture('formularioCompra').then((compra)=>{
        cy.visit(Cypress.env('carrito'))
        cy.wait(5000)
        cy.get(compra.btnPlaceOrder).click()
        datosCliente.forEach(dato=>{
            cy.get(compra.nombre).type(dato.nombreCli)
            cy.get(compra.pais).type(dato.paisCli)
            cy.get(compra.cuidad).type(dato.cuidadCli)
            cy.get(compra.tarjeta).type(dato.tarjetaCli)
            cy.get(compra.mes).type(dato.mes)
            cy.get(compra.anio).type(dato.anio)
        })
        cy.get(compra.btnComprar).click()
        cy.valRespuesta('OPTIONS','deletecart_url_api',200)
        cy.get(compra.btnConfirmarCompra).click()
        cy.get(compra.btnCerrar).click()
    
    })
})


Cypress.Commands.add('valRespuesta',(tipoMetodo,api_url,estado)=>{
    cy.request({
        method: tipoMetodo, 
        url: Cypress.env(api_url),
        headers: {
        accept: '/',
        }
        }).then((response) => {
        expect(response.status).to.eq(estado)
    })
})

Cypress.Commands.add('validacionRespuesta',(tipoMetodo,api_url,user,password,estado)=>{
    cy.request({
        method: tipoMetodo, 
        url: Cypress.env(api_url),
        headers: {
        accept: '/',
        },
        body: {
            username:user,
            password:password
        }
        }).then((response) => {
        expect(response.status).to.eq(estado)
        return cy.wrap(response.body.errorMessage).as("response");
    })
})


