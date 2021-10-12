'use strict'

const Factory = use('Factory')
const Database = use('Database')
const Model = use('App/Models/Address')

class AddressSeeder {
    async run() {
        var obj = [{
                user_id: '1',
                address_type_id: '2',
                address1: '20 Cooper Square',
                address2: '13th Street',
                city: 'New York City',
                state: 'NY',
                zip_code: '10001',
                country: 'US',
                security_code: '12345',
                longitude: '24.9552',
                latitude: '66.9901'
            },
            {
                user_id: '1',
                address_type_id: '1',
                address1: '111 Vallay Villa',
                address2: 'Gradford Ave',
                city: 'Manhatton',
                state: 'NY',
                zip_code: '10002',
                country: 'US',
                longitude: '24.9552',
                latitude: '66.9901'
            },
            {
                user_id: '2',
                address_type_id: '2',
                address1: 'Orangi Town',
                address2: 'Thorani Gowth',
                city: 'Karachi',
                state: 'SIndh',
                zip_code: '75800',
                country: 'PAK',
                longitude: '24.9552',
                latitude: '66.9901'
            },
            // {
            //   merchant_id: 1,
            //   address_type_id: '4',
            //   address_name: 'Work',
            //   address1: '200 Park Avenue',
            //   address2: 'Suite 400',
            //   city: 'New York',
            //   state: 'NY',
            //   zip_code: '10004'
            // },
            // {
            //   merchant_id: 2,
            //   address_type_id: '4',
            //   address_name: 'Work',
            //   address1: '100 Park Avenue',
            //   address2: 'Suite 404',
            //   city: 'New York',
            //   state: 'NY',
            //   zip_code: '10004'
            // },{
            //   user_id: '2',
            //   address_name: 'Work',
            //   address_type_id: '2',
            //   address1: '20 Cooper Square',
            //   address2: '13th Street',
            //   city: 'New York City',
            //   state: 'NY',
            //   zip_code: '10001',
            //   country: 'US',
            //   security_code: '12345',
            // },
            // {
            //   user_id: '2',
            //   address_name: 'Home',
            //   address_type_id: '1',
            //   address1: '20 Cooper Square',
            //   address2: '13th Street',
            //   city: 'New York City',
            //   state: 'NY',
            //   zip_code: '10001',
            //   country: 'US',
            //   security_code: '12345',
            // },
            // {
            //   user_id: '3',
            //   address_name: 'Work',
            //   address_type_id: '2',
            //   address1: '20 Cooper Square',
            //   address2: '13th Street',
            //   city: 'New York City',
            //   state: 'NY',
            //   zip_code: '10001',
            //   country: 'US',
            //   security_code: '12345',
            // },
            // {
            //   user_id: '3',
            //   address_name: 'Rental Property',
            //   address_type_id: '3',
            //   address1: '20 Cooper Square',
            //   address2: '13th Street',
            //   city: 'New York City',
            //   state: 'NY',
            //   zip_code: '10001',
            //   country: 'US',
            //   security_code: '12345',
            // },{
            //   user_id: '4',
            //   address_name: 'Work',
            //   address_type_id: '2',
            //   address1: '20 Cooper Square',
            //   address2: '13th Street',
            //   city: 'New York City',
            //   state: 'NY',
            //   zip_code: '10001',
            //   country: 'US',
            //   security_code: '12345',
            // },
            // {
            //   user_id: '4',
            //   address_name: 'Work',
            //   address_type_id: '2',
            //   address1: '20 Cooper Square',
            //   address2: '13th Street',
            //   city: 'New York City',
            //   state: 'NY',
            //   zip_code: '10001',
            //   country: 'US',
            //   security_code: '12345',
            // },
            // {
            //   user_id: '4',
            //   address_name: 'Rental Property',
            //   address_type_id: '3',
            //   address1: '20 Cooper Square',
            //   address2: '13th Street',
            //   city: 'New York City',
            //   state: 'NY',
            //   zip_code: '10001',
            //   country: 'US',
            //   security_code: '12345',
            // },
            // {
            //   user_id: '5',
            //   address_name: 'Work',
            //   address_type_id: '2',
            //   address1: '20 Cooper Square',
            //   address2: '13th Street',
            //   city: 'New York City',
            //   state: 'NY',
            //   zip_code: '10001',
            //   country: 'US',
            //   security_code: '12345',
            // },
            // {
            //   user_id: '6',
            //   address_name: 'Work',
            //   address_type_id: '2',
            //   address1: '20 Cooper Square',
            //   address2: '13th Street',
            //   city: 'New York City',
            //   state: 'NY',
            //   zip_code: '10001',
            //   country: 'US',
            //   security_code: '12345',
            // },
        ]

        await Model.createMany(obj)

    }

}

module.exports = AddressSeeder