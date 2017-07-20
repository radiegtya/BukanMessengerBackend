import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Chats = new Mongo.Collection('chats');

if(Meteor.isServer){

  Meteor.publish('chats', (selector = {}, options = {})=>{
    console.log('subscribing chats')
    return Chats.find(selector, options);
  });

}
