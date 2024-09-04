const usuario = require ('../../../data/frmLoginRegistro.json')
import {getRandomValues} from '../../../data/random'

describe('BLOQUE_REGISTRO_INICIO_SESION', () => {

    let randomName = getRandomValues()
    let userGenerico = 'QA2024_'+randomName
    let password = '2024QA_Pwd!'
    
    beforeEach(() => {
      cy.visit('/')
    })
    it("Registro de un nuevo usuario", () => {
        cy.validacionRespuesta('POST','signUpApi',userGenerico,password,200)
        cy.log('Usuario creado')
    })

    usuario.forEach(user=>{
        it(user.casoPrueba, () => {
          cy.validacionRespuesta('POST',user.proceso,userGenerico,user.passwordUser,200)        
          cy.get("@response").then((text) => {
            switch (user.errorMessage) {
              case 'This user already exist.':
                  expect(text).to.eq(user.errorMessage)
                break;
              case 'Wrong password.':
                  expect(text).to.eq(user.errorMessage)
                break;
              case 'NoError':
                  cy.log("Inicio de sesión exitoso")
                break;
          }
          })
          
        })
    })

 
  })
  