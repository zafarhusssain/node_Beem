'use strict'
module.exports = {

    register : {  
        role_id: 'required',        
        phone_number: 'required|starts_with:+',        
        email: 'required|email|unique:users,email',        
        password: 'required',
        // password_confirmation: 'required_if:password|same:password',
    },

    login : {                
        email: 'required|email',        
        password: 'required',        
    }

}