'use strict'

const Factory = use('Factory')
const Database = use('Database')
const Model = use('App/Models/User')

class UserSeeder {
    async run() {
        var obj = [{
                role_id: '3', // Administartor / company employee, 1- Customer, 2- Mechant User
                first_name: 'Super',
                last_name: 'Admin',
                phone_number: '+141234561',
                email: 'super@yopmail.com',
                password: 'Super@123',
                dob: '1990-12-25',
                gender_id: '3', //1-Male, 2-Female, 3-Other
                status_id: '1', //Active
                is_verified: '1', //true
                is_admin: '1', //true
                admin_type_id: '1' //1-Super Administartor, 2-Sub Admin, 3-Merchant
            },
            {
                role_id: '1', // Administartor / company employee, 1- Customer, 2- Mechant User
                display_picture_url: 'images/users/fahad.jpg',
                first_name: 'Zafar',
                last_name: 'Hussain',
                phone_number: '+1522334455',
                email: 'zafar@yopmail.com',
                password: 'Zafar@123',
                gender_id: '1', //1-Male, 2-Female, 3-Other
                status_id: '1', //Active
                is_verified: '1', //true
                // },
                // {
                //   role_id: '1', // Administartor / company employee, 1- Customer, 2- Mechant User
                //   first_name: 'Nabeel',
                //   last_name: 'Yousuf',
                //   phone_number: '+1522334466',
                //   email: 'nabeel@yopmail.com',
                //   password: 'Nabeel@123',
                //   gender_id: '1', //1-Male, 2-Female, 3-Other
                //   status_id: '1', //Active
                //   is_verified: '1', //true
                // },
                // {
                //   role_id: '1', // Administartor / company employee, 1- Customer, 2- Mechant User
                //   display_picture_url: 'images/users/qadeer.jpg',
                //   first_name: 'Qadeer',
                //   last_name: 'Mangrio',
                //   phone_number: '+1522334477',
                //   email: 'qadeer@yopmail.com',
                //   password: 'Qadeer@123',
                //   gender_id: '1', //1-Male, 2-Female, 3-Other
                //   status_id: '1', //Active
                //   is_verified: '1', //true
                // },
                // {
                //   role_id: '2', // Administartor / company employee, 1- Customer, 2- Mechant User
                //   first_name: 'Ahsan',
                //   last_name: 'Syed',
                //   phone_number: '+1522334488',
                //   email: 'ahsan@yopmail.com',
                //   password: 'Ahsan@123',
                //   gender_id: '1', //1-Male, 2-Female, 3-Other
                //   status_id: '1', //Active
                //   is_verified: '1', //true
                // },
                // {
                //   role_id: '2', // Administartor / company employee, 1- Customer, 2- Mechant User
                //   first_name: 'Neil',
                //   last_name: 'Conception',
                //   phone_number: '+1522334499',
                //   email: 'neil@yopmail.com',
                //   password: 'Neil@123',
                //   gender_id: '1', //1-Male, 2-Female, 3-Other
                //   status_id: '1', //Active
                //   is_verified: '1', //true
            }

        ]

        await Model.createMany(obj)

    }

}

module.exports = UserSeeder