import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Messages = new Mongo.Collection('messages');

if(Meteor.isServer){

  Meteor.publish('messages', (selector = {}, options = {})=>{
    console.log('subscribing messages')
    return Messages.find(selector, options);
  });

  Meteor.methods({
    
  });

}
