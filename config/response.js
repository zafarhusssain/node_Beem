'use strict'

async function success(data, message, code = false) {
    if (data) {
        if (data.paginate) {
            var result = {
                "status": true,
                "response_code": 200,
                "response_description": code ? code : null,
                "data": data,
                "message": message,
                "paginate": data.paginate
            }
        } else {
            if (data.rows) {
                var result = {
                    "status": true,
                    "response_code": 200,
                    "response_description": code ? code : null,
                    "data": data,
                    "message": data.rows.length === 0 ? 'No record found' : message,
                }
            } else {
                var result = {
                    "status": true,
                    "response_code": 200,
                    "response_description": code ? code : null,
                    "data": data,
                    "message": message,
                }
            }

        }

    } else {
        var result = {
            "status": true,
            "response_code": 200,
            "response_description": code ? code : null,
            "data": data,
            "message": 'Record does not exist',
        }
    }
    return result

}

async function error(message, code = false, response_code = false) {
    let result = {
        "status": false,
        "response_code": response_code ? parseInt(response_code) : 400,
        "response_description": code ? code : null,
        "data": null,
        "message": message
    }
    return result
}

async function dbOperation(status, data) {
    let result = {
        "status": status,
        "data": data
    }
    return result
}



module.exports = {
    success,
    error,
    dbOperation
}