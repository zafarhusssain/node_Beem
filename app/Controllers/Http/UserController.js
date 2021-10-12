'use strict'

const User = use('App/Models/User');
const Role = use('App/Models/Role');
const userService = use('App/Services/UserService')
const Logger = use('Logger')
const Database = use('Database')
const Config = use('Config');
const success = Config.get('response.success');
const error = Config.get('response.error');
const responseService = use('App/Services/ResponseService')
const commonService = use('App/Services/CommonService')
var fs = require('fs');

const Helpers = use('Helpers')
const public_path = Helpers.publicPath()


class UserController {

  async getUsers({ response, auth, request, session }) {
    try {
      // const users = await User.all();
      const users = await User
        .query()
        .with('role')
        .with('status')
        .with('admin_type')
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(users.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getUser({ response, auth, request, session }) {
    try {
      const user = await auth.getUser()
      const new_user = await User
        .query()
        .with('role')
        .with('status')
        .with('admin_type')
        // .with('tokens')
        .where('id', '=', user.id)
        .first()

      let token = await auth.generate(user)
      new_user.token = token.token

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(new_user.toJSON(), processedResponse.message, processedResponse.code);
      // console.log(resp.data.length)
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getUserByEmail({ response, auth, request, session, params }) {
    try {
      const user = await auth.getUser()
      console.log('params: ', params.email)
      const new_user = await User
        .query()
        .with('role')
        .with('status')
        .with('admin_type')
        // .with('tokens')
        .where('email', '=', params.email)
        .first()

      let token = await auth.generate(user)
      new_user.token = token.token

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(new_user.toJSON(), processedResponse.message, processedResponse.code);
      // console.log(resp.data.length)
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async updateUser({ response, auth, request }) {
    const trx = await Database.beginTransaction()
    try {

      console.log('--------------------File------------------------------')
      const filedata = request.file('display_picture_url')
      console.log(filedata)
      console.log('--------------------File------------------------------')

      let data = request.body
      const base64String = data.display_picture_base64

      const user = await User.find(data.user_id)
      delete data.user_id
      delete data.display_picture_url

      user.merge(data)

      await user.save(trx)

      if (request.file('display_picture_url')) {
        const profilePics = request.file('display_picture_url', {
          types: ['image'],
          size: '2mb'
        })
        let imgName = `${user.id}_${user.first_name}_${user.last_name}_${profilePics.fieldName}.jpeg`
        await profilePics.move(public_path + "/images/users/", {
          name: imgName,
          overwrite: true
        })
        user.display_picture_url = imgName
        if (!profilePics.moved()) {
          await trx.rollback()
          let processedResponse = await responseService.processResponse('IMAGE_SIZE_EXCEED')
          return await error(processedResponse.message, processedResponse.code)
          //return await error(profilePics.error().message, 'ERROR')
        }
        await user.save(trx)
      }

      if (data.display_picture_base64) {
        let new_name = `${user.id}_${user.first_name}_${user.last_name}_base64.jpeg`
        let path = `${public_path}/images/users/${user.id}_${user.first_name}_${user.last_name}_base64.jpeg`

        var imageBuffer = await commonService.createBuffer(base64String)
        var is_image_done = await commonService.createFileFromBase64(path, imageBuffer)
        user.display_picture_url_from_base64 = new_name
        await user.save(trx)
      }


      await trx.commit()

      const new_user = await User
        .query()
        // .transacting(trx)
        .with('role')
        .with('status')
        .with('admin_type')
        .with('tokens')
        .where('id', '=', user.id)
        .first()

      let token = await auth.generate(user)
      new_user.token = token.token

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(new_user.toJSON(), processedResponse.message, processedResponse.code);
      // console.log(resp.data.length)
      return response.json(resp);
    } catch (err) {
      await trx.rollback()
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async deleteUser({ response, auth, request }) {
    try {
      let data = request.body
      const user = await User.find(data.user_id)
      user.is_deleted = '1',
        user.deleted_at = new Date()

      await user.save()


      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success([], processedResponse.message, processedResponse.code);
      // console.log(resp.data.length)
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getAllAdminUsers({ response, auth, request, session }) {
    try {
      // const users = await User.all();
      const users = await User
        .query()
        .with('role')
        .with('status')
        .with('admin_type')
        .where('is_admin', '=', true)
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(users.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getAllActiveUsers({ response, auth, request, session }) {
    try {
      // const users = await User.all();
      const users = await User
        .query()
        .with('role')
        .with('status')
        .with('admin_type')
        .where('status_id', '=', 1)
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(users.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getAllBlockedUsers({ response, auth, request, session }) {
    try {
      // const users = await User.all();
      const users = await User
        .query()
        .with('role')
        .with('status')
        .with('admin_type')
        .where('status_id', '=', 2)
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(users.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getAllDeletedUsers({ response, auth, request, session }) {
    try {
      // const users = await User.all();
      const users = await User
        .queryWithOutScopes()
        .with('role')
        .with('status')
        .with('admin_type')
        .where('is_deleted', '=', true)
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(users.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getAllUsers({ response, auth, request, session }) {
    try {
      // const users = await User.all();
      const users = await User
        .queryWithOutScopes()
        .with('role')
        .with('status')
        .with('admin_type')
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(users.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }
}

module.exports = UserController
