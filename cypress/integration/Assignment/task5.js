/// <reference types = "Cypress" />

describe('Create Users for login',()=>{
    it('Verify login unsuccessful',()=>{

        cy.fixture('TaskData').then((payload) => {


            //post call
            cy.request({

                method: 'POST',
                url: 'https://reqres.in/api/login',
                body: {
                    "email": payload.email,
                    "password": payload.password
                }


            }).then((res) => {
                const userID = res.body.id
                cy.log("user id = " + userID);
                expect(res.status).to.eq(400)

            })

        })

    })
})