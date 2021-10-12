const Env = use('Env')

module.exports = {
  accountSid: Env.get('TWILIO_ACCOUNT_SID', null),
  authToken: Env.get('TWILIO_AUTH_TOKEN', null),
  fromNumber: Env.get('TWILIO_FROM_NUMBER', null)
}