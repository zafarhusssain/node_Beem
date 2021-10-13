'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your application. You can create
| routes for different URLs and bind Controller actions to them.
|
|
*/

const Route = use('Route')

Route.get('/', () => {
    return { greeting: 'Welcome to Beam-api project' }
})

// These two endpoints are made for reseting password through GUI.
Route.get('password/reset', 'AuthController.resetShow')
Route.post('password/reset', 'AuthController.resetPassword').as('reset')

Route.group(() => {
    /*
   |--------------------------------------------------------------------------
    | API - Authentication
    |--------------------------------------------------------------------------
    */

    Route.post('auth', 'AuthController.login').validator('AuthUser').middleware('auth_api_key')
    Route.post('password/forgot', 'AuthController.forgotPassword').validator('ResetPassword').middleware('auth_api_key')
    Route.post('password/change', 'AuthController.changePassword').validator('ChangePassword').middleware(['auth'])

    // This end point is created to remove device token
    // can also be used to revoke token if refresh token methodolgy used
    Route.get('logout', 'AuthController.logout').middleware(['auth'])

    /*
    |--------------------------------------------------------------------------
    | API - Customer User
    |--------------------------------------------------------------------------
    */

    Route.post('customer/user', 'AuthController.register').validator('RegisterUser').middleware('auth_api_key')
    Route.get('customer/user', 'UserController.getUser').middleware(['auth'])
    Route.get('user/:email', 'UserController.getUserByEmail').middleware(['auth', 'auth_admin'])
    Route.put('customer/user', 'UserController.updateUser').validator('UpdateUser').middleware(['auth'])
    Route.delete('customer/user', 'UserController.deleteUser').middleware(['auth'])

    /*
    |--------------------------------------------------------------------------
    | API - Customer Address
    |--------------------------------------------------------------------------
    */

    Route.get('customer/address', 'AddressController.getAddresses')
    Route.get('customer/address/:id', 'AddressController.getAddress')
    Route.post('customer/address', 'AddressController.createAddress')
    Route.put('customer/address', 'AddressController.updateAddress')
    Route.delete('customer/address', 'AddressController.deleteAddress')


    /*
    |--------------------------------------------------------------------------
    | API - Customer Card
    |--------------------------------------------------------------------------
    */

    Route.get('customer/card', 'CardController.getCardList')
    Route.get('customer/card/:id', 'CardController.getCard')
    Route.post('customer/card', 'CardController.createCard')
    Route.delete('customer/card', 'CardController.deleteCard')

    /*
    |--------------------------------------------------------------------------
    | API - Customer Quote
    |--------------------------------------------------------------------------
    */
    Route.get('customer/quotes', 'QuoteController.getCustomerAllQuotes')
    Route.get('customer/quote', 'QuoteController.getCustomerQuotes')
    Route.get('customer/quote/:id', 'QuoteController.getCustomerQuote')
    Route.post('customer/quote', 'QuoteController.createCustomerQuote')
    Route.put('customer/quote', 'QuoteController.updateCustomerQuote')
    Route.delete('customer/quote', 'QuoteController.deleteCustomerQuote')

    /*
    |--------------------------------------------------------------------------
    | API - Customer Appointment
    |--------------------------------------------------------------------------
    */

    Route.get('customer/appointment', 'AppointmentController.getCustomerAppointments')
    Route.get('customer/appointments', 'AppointmentController.getCustomerAppointmentsWithDate')
    Route.get('customer/appointment/:id', 'AppointmentController.getCustomerAppointment')
    Route.delete('customer/appointment', 'AppointmentController.deleteCustomerAppointment')
        /*
        |--------------------------------------------------------------------------
        | API - Customer Merchant Relationship
        |--------------------------------------------------------------------------
        */

    Route.get('customer/merchant', 'CustomerController.getCustomerMerchants')
    Route.get('customer/merchant/:id', 'CustomerController.getCustomerMerchant')
    Route.delete('customer/merchant', 'CustomerController.unlinkCustomerMerchant')

    /*
    |--------------------------------------------------------------------------
    | API - Customer Invoice
    |--------------------------------------------------------------------------
    */

    Route.get('customer/invoice', 'InvoiceController.getCustomerInvoices')
    Route.get('customer/invoice/:id', 'InvoiceController.getCustomerInvoice')
    Route.post('customer/invoice', 'InvoiceController.postCustomerInvoice')

    /*
    |--------------------------------------------------------------------------
    | API - Customer Message
    |--------------------------------------------------------------------------
    */

    Route.get('customer/message', 'MessagesController.getMessage')
    Route.get('customer/message/:id', 'MessageController.getCustomerMessage')
    Route.post('customer/message', 'MessageController.createCustomerMessage')
    Route.put('customer/message', 'MessageController.updateCustomerMessage')
    Route.delete('customer/message', 'MessageController.deleteCustomerMessage')

    /*
    |--------------------------------------------------------------------------
    | API - Customer Notification
    |--------------------------------------------------------------------------
    */

    Route.get('customer/notification', 'NotificationController.getCustomerNotifications')
    Route.get('customer/notification/:id', 'NotificationController.getCustomerNotification')
    Route.get('customer/settings/notification', 'NotificationController.getCustomerNotificationSettings')
    Route.put('customer/settings/notification', 'NotificationController.updateCustomerNotificationSettings')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant as Entity
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/entity', 'MerchantController.getMerchants').middleware('auth')
    Route.get('merchant/entity/:id', 'MerchantController.getMerchant').middleware('auth')
    Route.post('merchant/entity', 'MerchantController.createMerchant').validator('CreateMerchant').middleware('auth')
    Route.put('merchant/entity', 'MerchantController.updateMerchant').middleware('auth')
    Route.delete('merchant/entity', 'MerchantController.deleteMerchant').middleware('auth')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant Services
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/services', 'ServiceController.getMerchantServices')
    Route.get('merchant/services/:id', 'ServiceController.getMerchantService')
    Route.post('merchant/services', 'ServiceController.createMerchantService')
    Route.put('merchant/services', 'ServiceController.updateMerchantService')
    Route.delete('merchant/services', 'ServiceController.deleteMerchantService')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant User
    |--------------------------------------------------------------------------
    */

    Route.post('merchant/user', 'AuthController.register').validator('RegisterUser').middleware('auth', 'auth_admin')
    Route.get('merchant/user', 'UserController.getUser').middleware(['auth'])
    Route.put('merchant/user', 'UserController.updateUser').validator('UpdateUser').middleware(['auth', 'auth_admin_or_self'])
        /*
            |--------------------------------------------------------------------------
            | API - Merchant Institution 
            |--------------------------------------------------------------------------
            */

    Route.post('merchant/institution', 'InstitutionController.createInstitution').middleware('auth')
    Route.get('merchant/institution', 'InstitutionController.getInstitution').middleware(['auth'])
    Route.put('merchant/institution', 'InstitutionController.updateInstitution').middleware(['auth'])

    /*
    |--------------------------------------------------------------------------
    | API - Merchant Appointment
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/appointment', 'AppointmentController.getMerchantAppointments')
    Route.get('merchant/appointments', 'AppointmentController.getMerchantAppointmentsWithDate')
    Route.get('merchant/appointment/:id', 'AppointmentController.getMerchantAppointment')
    Route.post('merchant/appointment', 'AppointmentController.createMerchantAppointment')
    Route.put('merchant/appointment', 'AppointmentController.updateMerchantAppointment')
    Route.delete('merchant/appointment', 'AppointmentController.deleteMerchantAppointment')
    Route.delete('merchant/appointments', 'AppointmentController.deleteAllCustomerAppointments')

    Route.get('merchant/complete_appointment', 'AppointmentController.getMerchantCompletedAppointmentsDate')
    Route.get('merchant/schedule_appointment', 'AppointmentController.getMerchantScheduledAppointmentsDate')


    Route.get('merchant/relationship', 'MerchantController.getMerchantCustomerRelation')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant Quote
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/quotes', 'QuoteController.getMerchantAllQuotes')
    Route.get('merchant/quote', 'QuoteController.getMerchantQuotes')
    Route.get('merchant/quote/:id', 'QuoteController.getMerchantQuote')
    Route.post('merchant/quote', 'QuoteController.createMerchantQuote')
    Route.put('merchant/quote', 'QuoteController.updateMerchantQuote')
    Route.delete('merchant/quote', 'QuoteController.deleteMerchantQuote')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant Customer Relationship
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/customer', 'MerchantController.getCustomers')
    Route.delete('merchant/customer', 'MerchantController.unlinkCustomer')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant Invoice
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/invoice', 'InvoiceController.getMerchantInvoices')
    Route.get('merchant/invoice/:id', 'InvoiceController.getMerchantInvoice')
    Route.post('merchant/invoice', 'InvoiceController.createMerchantInvoice')
    Route.put('merchant/invoice', 'InvoiceController.updateMerchantInvoice')
    Route.delete('merchant/invoice', 'InvoiceController.deleteMerchantInvoice')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant Message
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/message', 'MessageController.getMerchantMessages')
    Route.get('merchant/message/:id', 'MessageController.getMerchantMessage')
    Route.post('merchant/message', 'MessageController.sendMerchantMessage')
    Route.put('merchant/message', 'MessageController.updateMerchantMessage')
    Route.delete('merchant/message', 'MessageController.deleteMerchantMessage')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant Notification
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/notification', 'NotificationController.getMerchantNotifications')
    Route.get('merchant/notification/:id', 'NotificationController.getvNotification')
    Route.get('merchant/settings/notification', 'NotificationController.getvNotificationSettings')
    Route.put('merchant/settings/notification', 'NotificationController.updatevNotificationSettings')

    /*
    |--------------------------------------------------------------------------
    | API - Admin User
    |--------------------------------------------------------------------------
    */

    Route.get('admin/user', 'UserController.getAllAdminUsers').middleware(['auth', 'auth_admin'])
    Route.post('admin/user', 'AuthController.register').validator('RegisterUser').middleware('auth', 'auth_admin')
    Route.put('admin/user', 'UserController.updateUser').validator('UpdateUser').middleware(['auth', 'auth_admin'])
        // Route.delete('admin/user', 'UserController.deleteUser').middleware(['auth', 'auth_admin'])

    /*
    |--------------------------------------------------------------------------
    | API - Report
    |--------------------------------------------------------------------------
    */

    Route.get('report', 'ReportController.generateReport')

    /*
    |--------------------------------------------------------------------------
    | API - Common or Need based end-points
    |--------------------------------------------------------------------------
    */
    Route.get('types/role', 'CommonController.getRoleTypes').middleware(['auth'])
    Route.get('types/status', 'CommonController.getStatusTypes').middleware(['auth'])
    Route.get('types/admin', 'CommonController.getAdminTypes').middleware(['auth'])
    Route.get('types/address', 'CommonController.getAddressTypes').middleware(['auth'])
    Route.get('types/card', 'CommonController.getCardTypes').middleware(['auth'])
    Route.get('types/response', 'CommonController.getResponseTypes').middleware(['auth'])
    Route.get('response', 'CommonController.getAllResponses').middleware(['auth'])
    Route.get('types/repeat', 'CommonController.getRepeatTypes').middleware(['auth'])
    Route.get('types/gender', 'CommonController.getGenderTypes').middleware(['auth'])

    Route.get('status/message', 'CommonController.getMessageStatuses').middleware(['auth'])
    Route.get('status/service', 'CommonController.getServiceStatuses').middleware(['auth'])
    Route.get('status/invoice', 'CommonController.getInvoiceStatuses').middleware(['auth'])
    Route.get('status/quote', 'CommonController.getQuoteStatuses').middleware(['auth'])
    Route.get('status/appointment', 'CommonController.getAppointmentStatuses').middleware(['auth'])


    Route.get('users', 'UserController.getUsers').middleware(['auth', 'auth_admin'])
    Route.get('users/active', 'UserController.getAllActiveUsers').middleware(['auth', 'auth_admin'])
    Route.get('users/block', 'UserController.getAllBlockedUsers').middleware(['auth', 'auth_admin'])
    Route.get('users/deleted', 'UserController.getAllDeletedUsers').middleware(['auth', 'auth_admin'])
    Route.get('users/all', 'UserController.getAllUsers').middleware(['auth', 'auth_admin'])

    //}).prefix('api/v1');
    /*
    |--------------------------------------------------------------------------
    | API - Authentication
    |--------------------------------------------------------------------------
    */

    Route.post('auth', 'AuthController.login').validator('AuthUser').middleware('auth_api_key')
    Route.post('password/forgot', 'AuthController.forgotPassword').validator('ResetPassword').middleware('auth_api_key')
    Route.post('password/change', 'AuthController.changePassword').validator('ChangePassword').middleware(['auth'])

    // This end point is created to remove device token
    // can also be used to revoke token if refresh token methodolgy used
    Route.get('logout', 'AuthController.logout').middleware(['auth'])

    /*
    |--------------------------------------------------------------------------
    | API - Customer User
    |--------------------------------------------------------------------------
    */

    Route.post('customer/user', 'AuthController.register').validator('RegisterUser').middleware('auth_api_key')
    Route.get('customer/user', 'UserController.getUser').middleware(['auth'])
    Route.get('user/:email', 'UserController.getUserByEmail').middleware(['auth', 'auth_admin'])
    Route.put('customer/user', 'UserController.updateUser').validator('UpdateUser').middleware(['auth'])
    Route.delete('customer/user', 'UserController.deleteUser').middleware(['auth'])

    /*
    |--------------------------------------------------------------------------
    | API - Customer Address
    |--------------------------------------------------------------------------
    */

    Route.get('customer/address', 'AddressController.getAddresses')
    Route.get('customer/address/:id', 'AddressController.getAddress')
    Route.post('customer/address', 'AddressController.createAddress')
    Route.put('customer/address', 'AddressController.updateAddress')
    Route.delete('customer/address', 'AddressController.deleteAddress')


    /*
    |--------------------------------------------------------------------------
    | API - Customer Card
    |--------------------------------------------------------------------------
    */

    Route.get('customer/card', 'CardController.getCardList')
    Route.get('customer/card/:id', 'CardController.getCard')
    Route.post('customer/card', 'CardController.createCard')
    Route.delete('customer/card', 'CardController.deleteCard')

    /*
    |--------------------------------------------------------------------------
    | API - Customer Quote
    |--------------------------------------------------------------------------
    */
    Route.get('customer/quotes', 'QuoteController.getCustomerAllQuotes')
    Route.get('customer/quote', 'QuoteController.getCustomerQuotes')
    Route.get('customer/quote/:id', 'QuoteController.getCustomerQuote')
    Route.post('customer/quote', 'QuoteController.createCustomerQuote')
    Route.put('customer/quote', 'QuoteController.updateCustomerQuote')
    Route.delete('customer/quote', 'QuoteController.deleteCustomerQuote')

    /*
    |--------------------------------------------------------------------------
    | API - Customer Appointment
    |--------------------------------------------------------------------------
    */

    Route.get('customer/appointment', 'AppointmentController.getCustomerAppointments')
    Route.get('customer/appointments', 'AppointmentController.getCustomerAppointmentsWithDate')
    Route.get('customer/appointment/:id', 'AppointmentController.getCustomerAppointment')
    Route.delete('customer/appointment', 'AppointmentController.deleteCustomerAppointment')

    Route.get('customer/complete_appointment', 'AppointmentController.getCustomerCompletedAppointmentsDate')
    Route.get('customer/schedule_appointment', 'AppointmentController.getCustomerScheduledAppointmentsDate')

    /*
    |--------------------------------------------------------------------------
    | API - Customer Merchant Relationship
    |--------------------------------------------------------------------------
    */

    Route.get('customer/merchant', 'CustomerController.getCustomerMerchants')
    Route.get('customer/merchant/:id', 'CustomerController.getCustomerMerchant')
    Route.delete('customer/merchant', 'CustomerController.unlinkCustomerMerchant')

    /*
    |--------------------------------------------------------------------------
    | API - Customer Invoice
    |--------------------------------------------------------------------------
    */

    Route.get('customer/invoice', 'InvoiceController.getCustomerInvoices')
    Route.get('customer/invoice/:id', 'InvoiceController.getCustomerInvoice')
    Route.post('customer/invoice', 'InvoiceController.postCustomerInvoice')

    /*
    |--------------------------------------------------------------------------
    | API - Customer Message
    |--------------------------------------------------------------------------
    */

    Route.get('customer/message', 'MessageController.getCustomerMessages')
    Route.get('customer/message/:id', 'MessageController.getCustomerMessage')
    Route.post('customer/message', 'MessageController.createCustomerMessage')
    Route.put('customer/message', 'MessageController.updateCustomerMessage')
    Route.delete('customer/message', 'MessageController.deleteCustomerMessage')

    /*
    |--------------------------------------------------------------------------
    | API - Customer Notification
    |--------------------------------------------------------------------------
    */

    Route.get('customer/notification', 'NotificationController.getCustomerNotifications')
    Route.get('customer/notification/:id', 'NotificationController.getCustomerNotification')
    Route.get('customer/settings/notification', 'NotificationController.getCustomerNotificationSettings')
    Route.put('customer/settings/notification', 'NotificationController.updateCustomerNotificationSettings')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant as Entity
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/entity', 'MerchantController.getMerchants').middleware('auth')
    Route.get('merchant/entity/:id', 'MerchantController.getMerchant').middleware('auth')
    Route.post('merchant/entity', 'MerchantController.createMerchant').validator('CreateMerchant').middleware('auth')
    Route.put('merchant/entity', 'MerchantController.updateMerchant').middleware('auth')
    Route.delete('merchant/entity', 'MerchantController.deleteMerchant').middleware('auth')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant Services
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/services', 'ServiceController.getMerchantServices')
    Route.get('merchant/services/:id', 'ServiceController.getMerchantService')
    Route.post('merchant/services', 'ServiceController.createMerchantService')
    Route.put('merchant/services', 'ServiceController.updateMerchantService')
    Route.delete('merchant/services', 'ServiceController.deleteMerchantService')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant User
    |--------------------------------------------------------------------------
    */

    Route.post('merchant/user', 'AuthController.register').validator('RegisterUser').middleware('auth', 'auth_admin')
    Route.get('merchant/user', 'UserController.getUser').middleware(['auth'])
    Route.put('merchant/user', 'UserController.updateUser').validator('UpdateUser').middleware(['auth', 'auth_admin_or_self'])

    /*
    |--------------------------------------------------------------------------
    | API - Merchant Appointment
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/appointment', 'AppointmentController.getMerchantAppointments')
    Route.get('merchant/appointments', 'AppointmentController.getMerchantAppointmentsWithDate')
    Route.get('merchant/appointment/:id', 'AppointmentController.getMerchantAppointment')
    Route.post('merchant/appointment', 'AppointmentController.createMerchantAppointment')
    Route.put('merchant/appointment', 'AppointmentController.updateMerchantAppointment')
    Route.delete('merchant/appointment', 'AppointmentController.deleteMerchantAppointment')
    Route.delete('merchant/appointments', 'AppointmentController.deleteAllCustomerAppointments')

    Route.get('merchant/complete_appointment', 'AppointmentController.getMerchantCompletedAppointmentsDate')
    Route.get('merchant/schedule_appointment', 'AppointmentController.getMerchantScheduledAppointmentsDate')


    Route.get('merchant/relationship', 'MerchantController.getMerchantCustomerRelation')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant Quote
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/quotes', 'QuoteController.getMerchantAllQuotes')
    Route.get('merchant/quote', 'QuoteController.getMerchantQuotes')
    Route.get('merchant/quote/:id', 'QuoteController.getMerchantQuote')
    Route.post('merchant/quote', 'QuoteController.createMerchantQuote')
    Route.put('merchant/quote', 'QuoteController.updateMerchantQuote')
    Route.delete('merchant/quote', 'QuoteController.deleteMerchantQuote')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant Customer Relationship
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/customer', 'MerchantController.getCustomers')
    Route.delete('merchant/customer', 'MerchantController.unlinkCustomer')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant Invoice
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/invoice', 'InvoiceController.getMerchantInvoices')
    Route.get('merchant/invoice/:id', 'InvoiceController.getMerchantInvoice')
    Route.post('merchant/invoice', 'InvoiceController.createMerchantInvoice')
    Route.put('merchant/invoice', 'InvoiceController.updateMerchantInvoice')
    Route.delete('merchant/invoice', 'InvoiceController.deleteMerchantInvoice')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant Message
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/message', 'MessageController.getMerchantMessages')
    Route.get('merchant/message/:id', 'MessageController.getMerchantMessage')
    Route.post('merchant/message', 'MessageController.sendMerchantMessage')
    Route.put('merchant/message', 'MessageController.updateMerchantMessage')
    Route.delete('merchant/message', 'MessageController.deleteMerchantMessage')

    /*
    |--------------------------------------------------------------------------
    | API - Merchant Notification
    |--------------------------------------------------------------------------
    */

    Route.get('merchant/notification', 'NotificationController.getMerchantNotifications')
    Route.get('merchant/notification/:id', 'NotificationController.getvNotification')
    Route.get('merchant/settings/notification', 'NotificationController.getvNotificationSettings')
    Route.put('merchant/settings/notification', 'NotificationController.updatevNotificationSettings')

    /*
    |--------------------------------------------------------------------------
    | API - Admin User
    |--------------------------------------------------------------------------
    */

    Route.get('admin/user', 'UserController.getAllAdminUsers').middleware(['auth', 'auth_admin'])
    Route.post('admin/user', 'AuthController.register').validator('RegisterUser').middleware('auth', 'auth_admin')
    Route.put('admin/user', 'UserController.updateUser').validator('UpdateUser').middleware(['auth', 'auth_admin'])
        // Route.delete('admin/user', 'UserController.deleteUser').middleware(['auth', 'auth_admin'])

    /*
    |--------------------------------------------------------------------------
    | API - Report
    |--------------------------------------------------------------------------
    */

    Route.get('report', 'ReportController.generateReport')

    /*
    |--------------------------------------------------------------------------
    | API - Common or Need based end-points
    |--------------------------------------------------------------------------
    */
    Route.get('types/role', 'CommonController.getRoleTypes').middleware(['auth'])
    Route.get('types/status', 'CommonController.getStatusTypes').middleware(['auth'])
    Route.get('types/admin', 'CommonController.getAdminTypes').middleware(['auth'])
    Route.get('types/address', 'CommonController.getAddressTypes').middleware(['auth'])
    Route.get('types/card', 'CommonController.getCardTypes').middleware(['auth'])
    Route.get('types/response', 'CommonController.getResponseTypes').middleware(['auth'])
    Route.get('response', 'CommonController.getAllResponses').middleware(['auth'])
    Route.get('types/repeat', 'CommonController.getRepeatTypes').middleware(['auth'])
    Route.get('types/gender', 'CommonController.getGenderTypes').middleware(['auth'])

    Route.get('status/message', 'CommonController.getMessageStatuses').middleware(['auth'])
    Route.get('status/service', 'CommonController.getServiceStatuses').middleware(['auth'])
    Route.get('status/invoice', 'CommonController.getInvoiceStatuses').middleware(['auth'])
    Route.get('status/quote', 'CommonController.getQuoteStatuses').middleware(['auth'])
    Route.get('status/appointment', 'CommonController.getAppointmentStatuses').middleware(['auth'])


    Route.get('users', 'UserController.getUsers').middleware(['auth', 'auth_admin'])
    Route.get('users/active', 'UserController.getAllActiveUsers').middleware(['auth', 'auth_admin'])
    Route.get('users/block', 'UserController.getAllBlockedUsers').middleware(['auth', 'auth_admin'])
    Route.get('users/deleted', 'UserController.getAllDeletedUsers').middleware(['auth', 'auth_admin'])
    Route.get('users/all', 'UserController.getAllUsers').middleware(['auth', 'auth_admin'])


    Route.get('countries', 'CommonController.getCounties')
    Route.get('states', 'CommonController.getStatesByCountry')
    Route.get('cities', 'CommonController.getCitiesByState')



}).prefix('api/v1');