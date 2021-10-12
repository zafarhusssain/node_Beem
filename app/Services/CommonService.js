'use strict'
const Logger = use('Logger')
var fs = require('fs');
var requests = require('request');

class CommonService {

    async consoleError(controller_name, function_name, error_message, stack_traces) {
        Logger.error(stack_traces)
        console.log('\x1b[31m%s\x1b[0m', '------------------------------ ERROR START ------------------------------------\n',
            '\x1b[32mController: \x1b[0m', controller_name, '\n',
            '\x1b[32mFunction: \x1b[0m', function_name.stack.split(/\r\n|\r|\n/g)[1].trim().split('.')[1].split(' ')[0], '\n',
            '\x1b[32mError: \x1b[0m', '\x1b[36m', error_message, '\x1b[0m\n',
            '------------------------------------------------------------------------------', '\n',
            '\x1b[32mStack Traces: \x1b[0m', stack_traces, '\n',
            '\n\x1b[33m', '------------------------------ ERROR END ------------------------------------\x1b[0m')

    }

    async createBuffer(string){
      return new Promise(function (resolve, reject) {
        resolve(Buffer.from(string, 'base64'))
      })
    }

    async createSendBirdUser(options) {
      return new Promise(function (resolve, reject) {
        requests(options, async function (err, response) {
          if (err) {
            console.log(err)
            reject(err.message)
          }
          console.log(response.body);
          resolve(response.body)
        })
      })
    }

    async createFileFromBase64(filename, base64_string) {
      return new Promise(function (resolve, reject) {
        fs.writeFile(filename, base64_string, { encoding: 'base64' }, async function (err) {
          if (err) {
            console.log(err)
            reject(err.message)
          }
          console.log('File created');
          resolve(true)
        })
      })
    }
}

const commonService = new CommonService()
module.exports = commonService
