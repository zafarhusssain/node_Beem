const { ServiceProvider } = require('@adonisjs/fold')

class TwilioProvider extends ServiceProvider {
  register () {
    this.app.singleton('Bee/Queue', () => {
      const Config = this.app.use('Adonis/Src/Config')
      return new (require('.'))(Config)
    })
  }
}

module.exports = TwilioProvider