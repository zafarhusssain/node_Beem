'use strict'

const Factory = use('Factory')
const Model = use('App/Models/Institution')
const Database = use('Database')

class InstitutionSeeder {
    async run() {
        var obj = [{
                name: 'Merchant',
                code: '001',
                description: 'a merchant'
            },
            {
                name: 'Customer',
                code: '002',
                description: 'A customer'
            },
            {
                name: 'Labour',
                code: '003',
                description: 'Beem employee'
            },
        ]

        await Model.createMany(obj)

    }
}

module.exports = InstitutionSeeder