'use strict'

const resp = {
    MSG000: 'Success',
    MSG001: 'Account created successfully',
    MSG002: 'Your password has been successfully reset. Please log in with your new password.',
    MSG003: 'Password changed successfully',
    MSG004: 'Profile updated succesfully',
    MSG005: 'N/A',

    ERR000: 'An error has occurred, please try again',
    ERR001: 'Invalid API Key',
    ERR002: 'Invalid Session Token',
    ERR003: 'Invalid username or password',
    ERR004: 'Email not found – Password Reset',
    ERR005: 'Account inactive',
    ERR006: 'Email not unique',
    ERR007: 'Email not found',
    ERR009: 'Merchant name not unique',
    ERR010: 'Merchant name not found',
    ERR011: 'Database read error',
    ERR012: 'Database write error',

    ERR100: 'This user is unauthorized to perform this task',

    LERR001: 'Communication error',
    LERR002s: 'Error setting selected language',

    E_PASSWORD_MISMATCH: 'ERR003',
    E_USER_NOT_FOUND: 'ERR007',
    E_JWT_TOKEN_EXPIRED: 'ERR002',
    E_INVALID_JWT_TOKEN: 'ERR002',
}

async function success(type) {
    let response = ''
    switch (type) {
        case 'account_created':
            response = 'Account has been successfully created'
            break
        case 'login':
            response = 'User Successfully login'
            break
        default:
            response = 'Success'
    }
    return response
}

async function error(type) {
    let response = ''
    switch (type) {
        case 'general':
            response = 'An error has occurred, please try again.'
            break
        case 'login':
            response = 'Login failed. Invalid credentils'
            break
        case 'invalid_api_key':
            response = 'Api Key is invalid'
            break
        default:
            response = 'An error has occurred, please try again.'
    }
    return response
}

async function info(type) {
    let response = ''
    switch (type) {
        case 'test':
            response = 'Test information for the api'
            break
        default:
            response = 'Information'
    }
    return response
}


module.exports = {
    success,
    error,
    info,
    resp
}
