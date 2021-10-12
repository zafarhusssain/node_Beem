'use strict'
const Config = use('Config')
const constants = Config.get('constants.resp')
const pg_errors = Config.get('database_errors.postgres')

class ResponseService {

    async processResponse(res_code, is_other = false, error_data = false) {
        var response = {
            message: constants['ERR000'],
            code: 'ERR-000'
        }
        try {
            if (constants[res_code]) {
                let code = is_other ? constants[res_code] : res_code
                response.message = constants[code]
                response.code = code.slice(0, code.length - 3) + '-' + code.slice(code.length - 3)
            }else{
                if(error_data){
                    response.message = error_data.detail ? error_data.detail : error_data.message
                    response.code = error_data.code ? error_data.code : 'ERR-000'
                }                
            }
            return response
        } catch (err) {
            console.log('Error inside processResponse: ', this, err);
            return response
        }
    }
}

const responseService = new ResponseService()
module.exports = responseService