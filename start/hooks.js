const { ioc } = require('@adonisjs/fold')

ioc.bind('MyApp/CustomSerializer', () => {
  return require('./app/Serializers/CustomSerializer')
})