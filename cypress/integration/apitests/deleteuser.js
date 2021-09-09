//for auto suggestion  in vsc
/// <reference types = "Cypress" />

// const { use } = require("chai");
// const { eq } = require("cypress/types/lodash");


//const dataJson = require('../../fixtures/createuser')
describe('Delete user request', () => {
    //let accesstoken = '85130be56615e01bceb70219f5c749914a42454db08b734250118e50e76f218c'
    let randomText = "";
    let testEmail = "";
    it('Delete user test', () => {

        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++) {
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
            testEmail = randomText + '@gmail.com'
        }

        cy.fixture('createuser').then((payload) => {


            //post call
            cy.request({

                method: 'POST',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'authorization': "Bearer 85130be56615e01bceb70219f5c749914a42454db08b734250118e50e76f218c"
                },
                body: { //body is json payload
                    "name": payload.name,//dataJson.name
                    "email": testEmail,
                    "gender": payload.gender,
                    "status": payload.status
                }


            }).then((res) => {
                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(201)
                expect(res.body.data).has.property('email', testEmail)
                expect(res.body.data).has.property('name', payload.name)
                expect(res.body.data).has.property('gender', payload.gender)
                expect(res.body.data).has.property('status', payload.status)
            }).then((res) => {
                const userID = res.body.data.id
                cy.log("user id = " + userID);

                //get call
                cy.request({
                    method: 'GET',
                    url: 'https://gorest.co.in/public/v1/users/' + userID,
                    headers: {
                        'authorization': "Bearer 85130be56615e01bceb70219f5c749914a42454db08b734250118e50e76f218c"
                    }

                }).then((res) => {
                    expect(res.status).to.eq(200)
                    expect(res.body.data).has.property('id', userID)
                    expect(res.body.data).has.property('email', testEmail)
                    expect(res.body.data).has.property('name', payload.name)
                    expect(res.body.data).has.property('gender', payload.gender)
                    expect(res.body.data).has.property('status', payload.status)
                })
            }).then((res) => {
                const userID = res.body.data.id
                cy.log("user id = " + userID);

                //Delete call
                cy.request({
                    method: 'DELETE',
                    url: 'https://gorest.co.in/public/v1/users/' + userID,
                    headers: {
                        'authorization': "Bearer 85130be56615e01bceb70219f5c749914a42454db08b734250118e50e76f218c"
                    }

                }).then((res) => {
                    expect(res.status).to.eq(204)
                })
            })

        })
    });
});