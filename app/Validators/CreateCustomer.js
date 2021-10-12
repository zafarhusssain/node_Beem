"use strict";
const Logger = use("Logger");
const { formatters } = use("Validator");
const Config = use("Config");
const error = Config.get("response.error");
const responseService = use("App/Services/ResponseService");

class CreateCustomer {
  get validateAll() {
    return true;
  }
  // these are the rules
  get rules() {
    return {
      email: "required|email|max:50",
      business_name:
        "required|unique:merchants,business_name,is_deleted,1|max:50",
      phone_number: "required|max:15",
      description: "required",
      hero_image: "required",
      address: "required",
    };
  }

  get messages() {
    return {
      required: "{{ field }} is required",
      "email.email": "You must provide a valid email address.",
      unique: "{{ field }} already exist",
      max: "Maximum length allowed for {{ field }} is {{ argument.0 }}",
      min: "Minimum length required for {{ field }} is {{ argument.0 }}",
    };
  }

  get sanitizationRules() {
    return {
      email: "normalize_email",
      role_id: "to_int",
    };
  }

  get data() {
    // const requestBody = this.ctx.request.all()
    // const api_key = this.ctx.request.header('key')
    // return Object.assign({}, requestBody, { api_key })
  }

  get formatter() {
    return formatters.JsonApi;
  }

  async fails(errorMessages) {
    Logger.warning(errorMessages);
    console.log(errorMessages.errors);
    let unique_constarint = errorMessages.errors[0].title;
    let pointer = errorMessages.errors[0].source.pointer;
    let processedResponse = {};
    if (unique_constarint == "unique") {
      let code = pointer == "email" ? "ERR006" : "ERR000";
      processedResponse = await responseService.processResponse(code);
    } else {
      processedResponse.message = errorMessages.errors[0].detail;
      processedResponse.code = null;
    }
    let resp = await error(processedResponse.message, processedResponse.code);
    return this.ctx.response.send(resp);
  }
}

module.exports = CreateCustomer;
