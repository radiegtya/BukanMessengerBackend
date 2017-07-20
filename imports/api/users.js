import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {Accounts} from 'meteor/accounts-base';

if(Meteor.isServer){

  Meteor.publish('users', (selector = {}, options = {})=>{
    return Meteor.users.find(selector, options);
  });

  Meteor.methods({
    'users.verifyPhoneNumber'(phoneNumber, pin){
      //1. find user with existing phoneNumber
      const user = Meteor.users.findOne({username: phoneNumber});
      //2. if not found, then create new account with phoneNumber as username and pin as the password, then login
      if(!user){
        const account = Accounts.createUser({
          username: phoneNumber,
          password: "" + pin,
          profile: {
            firstName: phoneNumber,
            lastName: ""
          }
        });
        return true;
      }
      //3. else changePassword with new PIN, and login with phoneNumber as username and pin as the password
      else {
        Accounts.setPassword(user._id, ""+ pin);
        return true;
      }
    }
  });

}
