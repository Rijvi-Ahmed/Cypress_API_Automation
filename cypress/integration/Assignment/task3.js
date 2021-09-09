/// <reference types = "Cypress" />

describe('Create register', () => {
    it('Verify the token and ID is not null', () => {

        cy.fixture('register').then((payload) => {


            //post call
            cy.request({

                method: 'POST',
                url: 'https://reqres.in/api/register',
                body: {
                    "email": payload.email,
                    "password": payload.password
                }


            }).then((res) => {
                const userID = res.body.id
                const UserToken = res.body.token
                cy.log("user id = " + userID);
                cy.log("user id = " + UserToken);
                expect(res.status).to.eq(200)
                expect(res.body.token).to.eq(UserToken)// verify token
                cy.contains(res.body.id).should('not.be.empty')//  id not null

            })

        })

    })
})