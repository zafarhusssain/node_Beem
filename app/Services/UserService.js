// the purpose of this service, to peform all user related actions  
'use strict'
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const Hash = use('Hash')

const Database = use('Database');
const Config = use('Config');
const db_response = Config.get('response.dbOperation');

async function register(userInfo, roleData) {
    try {
      const user = await User.create(userInfo)
      if (user) {     
        let resp = await db_response(true, user);
        return resp
      }
  
    } catch (err) {
      console.log("Err - UserService, Function: register(userInfo), Parmaters: userInfo:" + userInfo + err);
      let resp = await db_response(false, err.sqlMessage);
      return resp
    }
  }

  async function getUserTypeByRoleId(role_id) {
    try {
      const role = await Role.findBy('role_id', role_id)
      if (role) {     
        let resp = await db_response(true, role);
        return resp
      }
  
    } catch (err) {
      console.log('Err - UserService ' + err);
      let resp = await db_response(false, err.sqlMessage);
      return resp
    }
  }

  async function getUserByEmail(email) {
    try {
      const query = await User.findBy('email', email)
      if (query) {     
        let resp = await db_response(true, query);
        return resp
      }
  
    } catch (err) {
      console.log('Err - UserService ' + err);
      let resp = await db_response(false, err.sqlMessage);
      return resp
    }
  }
  

  module.exports = {
    register,
    getUserTypeByRoleId,
    getUserByEmail
  }