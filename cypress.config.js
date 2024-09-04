const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1000,
  viewportHeight: 800,
  e2e: {
    baseUrl: 'https://demoblaze.com/',
    async setupNodeEvents(on, config) {
      //require('cypress-mochawesome-reporter/plugin')(on);
    },
    specPattern: "cypress/e2e/features/*/*.cy.js",
    env: {
      ////MAPEO DE PAGINAS
       carrito: '/cart.html',
       
      ///RUTAS
      cart_url_api: 'https://api.demoblaze.com/addtocart',
      deletecart_url_api: 'https://api.demoblaze.com/deletecart',
      signUpApi:'https://api.demoblaze.com/signup',
      loginApi: 'https://api.demoblaze.com/login'
     
    
    },
  },
});
