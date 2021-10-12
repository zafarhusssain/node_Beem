const Event = use('Event')
const Mail = use('Mail')
const Env = use('Env')
const MAIL_FROM = Env.get('MAIL_FROM')
const APP_NAME = Env.get('APP_NAME')
// const Twilio = use('Twilio')


//Email to be sent on event fired of reset password
Event.on('reset::password', async (data) => {
  await Mail.send('password.reset-password-email-template', data, (message) => {
    message.subject(APP_NAME+ ': Reset Password')
    message.to(data.email)
    message.from(MAIL_FROM, APP_NAME)
  })

//Here will include SMS services

  // await Twilio.sendMessage('+14108675309', 'Hello from Node', function (err, response) {
  //   console.log(err, response);
  // })
})