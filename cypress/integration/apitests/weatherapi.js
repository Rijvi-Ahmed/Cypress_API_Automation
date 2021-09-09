describe('Check weather information', () => {
    it('get weather infromation from cities', () => {
        //first request GET call for all 'san' related citys
        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=san'
        }).then((res) => {
            const city = res.body[0].title
            return city
        }).then((city) => {
            //2nd request Get call for the first 'san' related city/location
            cy.request({
                method: 'GET',
                url: 'https://www.metaweather.com/api/location/search/?query=' + city
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body[0]).to.have.property('title', city)
            })
        })

    })



    it.only('get weather infromation for all the city', () => {
        //first request GET call for all 'am' related citys
        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=Am'
        }).then((res) => {
            const location = res.body
            return location

        }).then((location) => {

            for (let i = 0; i < location.length; i++) {
                //2nd request Get call for one by one 'am' related citys/location 
                cy.request({
                    method: 'GET',
                    url: 'https://www.metaweather.com/api/location/search/?query=' + location[i].title
                }).then((res) => {
                    expect(res.status).to.eq(200)
                    expect(res.body[0]).to.have.property('title', location[i].title)
                })
            }


        })

    })
})