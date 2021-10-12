'use strict'
module.exports = {

    register : {        
        'role_id.required': 'Role is required',

        'phone_number.required': 'Phone number is required',
        'phone_number.unique': 'Phone number is already registred',
        'phone_number.max': 'Maximum 15 digits allowed in phone number',
        'phone_number.number': 'Only digit values are allowed',
        'phone_number.startsWith': 'Phone number must starts with +',

        'email.required': 'Email is required',
        'email.email': 'Email must be properly formated',
        'email.unique': 'Email already exist',
        
        'password.required': 'Password is required',
        'password_confirmation.required_if': 'Confirmation password  is required',
        'password_confirmation.same': 'Confirmation password must be same as passsword',
    },
    
    login : {
        'email.required': 'Email is required',
        'email.email': 'Email must be properly formated',
        
        'password.required': 'Password is required',
        'test': 'this is test message'
    },
}