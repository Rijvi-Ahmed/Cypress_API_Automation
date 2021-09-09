/// <reference types = "Cypress" />

describe('Create Users',()=>{
    it('Verify name',()=>{

        cy.fixture('TaskCreateUser').then((payload) => {


            //post call
            cy.request({

                method: 'POST',
                url: 'https://reqres.in/api/users',
                body: {
                    "name": payload.name,
                    "job": payload.job
                }


            }).then((res) => {
                const userID = res.body.id
                cy.log("user id = " + userID);
                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(201)
                expect(res.body.name).to.eq(payload.name)
                //expect(res.body.job).to.eq(payload.job)
            })

        })

    })
})