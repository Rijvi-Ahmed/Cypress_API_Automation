//for auto suggestion  in vsc
/// <reference types = "Cypress" />

describe('get api user test',()=>{
  
    let accesstoken = '85130be56615e01bceb70219f5c749914a42454db08b734250118e50e76f218c'
        it('get users test',()=>{   //it.only use for just that test case running

            cy.request({

                method: 'GET',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'authorization' : "Bearer" + accesstoken
                }

            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.meta.pagination.limit).to.eq(20)
            })
        })

        it('get users test by id',()=>{

            cy.request({

                method: 'GET',
                url: 'https://gorest.co.in/public/v1/users/54',
                headers: {
                    'authorization' : "Bearer" + accesstoken
                }

            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.data.gender).to.eq('female')
            })
        })




})