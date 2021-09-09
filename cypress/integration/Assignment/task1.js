/// <reference types = "Cypress" />/// <reference types = "Cypress" />

describe('Update Users', () => {
    it('Update value of job and verify', () => {

        cy.fixture('TaskCreateUser').then((payload) => {

            //create data
            //post call
            cy.request({

                method: 'POST',
                url: 'https://reqres.in/api/users',
                body: {
                    "name": payload.name,
                    "job": payload.job
                }


            }).then((res) => {
                //update data
                const constantId = res.body.id
                cy.log("user id = " + constantId);

                cy.fixture('TaskUpdateUser').then((obj) => {

                    //put call
                    cy.request({

                        method: 'PUT',
                        url: 'https://reqres.in/api/users' + constantId,
                        body: {
                            "name": obj.name,
                            "job": obj.job
                        }


                    }).then((res) => {
                        cy.log(JSON.stringify(res))
                        expect(res.status).to.eq(200)
                        expect(res.body.job).to.eq(obj.job)
                       // expect(res.body.name).to.eq(obj.name)

                    })

                })


            })

        })

    })
})