'use strict'

const Factory = use('Factory')
const Database = use('Database')
const Model = use('App/Models/Response')

class ResponseSeeder {
  async run () {
    var obj = [
      //Error responses
      {
        response_name: 'ERR000',
        response_code: 'ERR-000',
        response_description: 'General error',
        response_type_id: 2,
        response_message: 'An error has occurred, please try again later or contact administrator'
      },
      {
        response_name: 'ERR001',
        response_code: 'ERR-001',
        response_description: 'Invalid API Key',
        response_type_id: 2,
        response_message: 'We are unable to process your request at this time (ERR-001).'
      },
      {
        response_name: 'ERR002',
        response_code: 'ERR-002',
        response_description: 'Invalid Session Token',
        response_type_id: 2,
        response_message: 'You have been logged out due to inactivity. Please sign in to continue.'
      },
      {
        response_name: 'ERR003',
        response_code: 'ERR-003',
        response_description: 'Invalid username or password',
        response_type_id: 2,
        response_message: 'Invalid username or password.'
      },
      {
        response_name: 'ERR004',
        response_code: 'ERR-004',
        response_description: 'Email not found – Password Reset',
        response_type_id: 2,
        response_message: 'We are unable to locate an account with the specified email. Verify your email address and try again.'
      },
      {
        response_name: 'ERR005',
        response_code: 'ERR-005',
        response_description: 'Account inactive',
        response_type_id: 2,
        response_message: 'We are unable to process your request at this time (ERR-005).'
      },
      {
        response_name: 'ERR006',
        response_code: 'ERR-006',
        response_description: 'Email not unique',
        response_type_id: 2,
        response_message: 'An account already exists for the specified email. Please return to the login page to sign in with this account, or use the reset password link to recover a forgotten password.'
      },
      {
        response_name: 'ERR007',
        response_code: 'ERR-007',
        response_description: 'Email not found',
        response_type_id: 2,
        response_message: 'Unable to locate specified email address (ERR-007).'
      },
      {
        response_name: 'ERR009',
        response_code: 'ERR-009',
        response_description: 'Merchant name not unique',
        response_type_id: 2,
        response_message: 'The specified merchant already exists.'
      },
      {
        response_name: 'ERR010',
        response_code: 'ERR-010',
        response_description: 'Merchant name not found',
        response_type_id: 2,
        response_message: 'Unable to locate specified merchant (ERR-010).'
      },
      {
        response_name: 'ERR011',
        response_code: 'ERR-011',
        response_description: 'Database read erro',
        response_type_id: 2,
        response_message: 'An error has occurred (ERR-011).'
      },
      {
        response_name: 'ERR012',
        response_code: 'ERR-012',
        response_description: 'Database write error',
        response_type_id: 2,
        response_message: 'An error has occurred (ERR-012).'
      },
      //Success responses
      {
        response_name: 'MSG000',
        response_code: 'MSG-000',
        response_description: 'General success',
        response_type_id: 1,
        response_message: 'Your request is  processed successfully.'
      },
      {
        response_name: 'MSG001',
        response_code: 'MSG-001',
        response_description: 'Password changed successfully.',
        response_type_id: 1,
        response_message: 'An error has occured, please try again'
      },
      {
        response_name: 'MSG002',
        response_code: 'MSG-002',
        response_description: 'Password reset success',
        response_type_id: 1,
        response_message: 'Your password has been reset. Please check your email for additional information.'
      },
      {
        response_name: 'MSG003',
        response_code: 'MSG-003',
        response_description: 'Password change success',
        response_type_id: 1,
        response_message: 'Your password has been changed successfully. Please sign in to continue using services.'
      },
      {
        response_name: 'MSG004',
        response_code: 'MSG-004',
        response_description: 'Profile update success',
        response_type_id: 2,
        response_message: 'Profile has been updated successfully.'
      },
      //Local errors response
      {
        response_name: 'LERR001',
        response_code: 'LERR-001',
        response_description: 'Communication error',
        response_type_id: 3,
        response_message: 'Error in loading transalation file'
      },
      {
        response_name: 'LERR002',
        response_code: 'LERR-002',
        response_description: 'Error setting selected language',
        response_type_id: 3,
        response_message: 'Error in loading transalation file'
      },

]

await Model.createMany(obj)
  }
}

module.exports = ResponseSeeder
