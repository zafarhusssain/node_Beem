'use strict'
var path  =require('path');
/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/validator/providers/ValidatorProvider',
  '@adonisjs/mail/providers/MailProvider',
  '@adonisjs/framework/providers/ViewProvider',
  // 'adonis-twilio/providers/TwilioProvider',
  path.join(__dirname, '..', 'providers', 'ValidateCompoundUnique/Provider'),
  path.join(__dirname, '..', 'providers', 'ValidateMultipleUnique/Provider'),
  'adonis-bumblebee/providers/BumblebeeProvider',
  '@adonisjs/session/providers/SessionProvider'
  
]

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  // 'adonis-twilio/providers/CommandsProvider'
  'adonis-bumblebee/providers/CommandsProvider'
]

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  // Twilio: 'Adonis/Addons/Twilio'
}

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = [
  // 'Adonis/Commands/Twilio:Config'
]

module.exports = { providers, aceProviders, aliases, commands }
