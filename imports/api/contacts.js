import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {Accounts} from 'meteor/accounts-base';

const Contacts = new Mongo.Collection('contacts');

if(Meteor.isServer){

  Meteor.publish('contacts', (selector = {}, options = {})=>{
    console.log('subscribing contacts');
    return Contacts.find(selector, options);
  });

  Meteor.methods({
    //generate contacts by phoneNumbers from contact on phone
    'contacts.generate'(phoneNumbers){
      const users = Meteor.users.find({username: {$in: phoneNumbers}});
      users.forEach((user)=>{
        if(this.userId){
          Contacts.upsert({userId: user._id, ownerId: this.userId}, {
            $set: {
              userId: user._id,
              ownerId: this.userId,
              user: user
            }
          });
        }
      });
    }
  });

}
