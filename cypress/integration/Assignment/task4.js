//for auto suggestion  in vsc
/// <reference types = "Cypress" />

describe('get 2nd iID details',()=>{
  
        it('Verify the 2nd id name',()=>{

            cy.request({

                method: 'GET',
                url: 'https://reqres.in/api/unknown',

            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.data[1].name).to.eq("fuchsia rose")
            })
        })





})