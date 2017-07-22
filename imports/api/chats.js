import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Chats = new Mongo.Collection('chats');

if(Meteor.isServer){

  Meteor.publish('chats', (selector = {}, options = {})=>{
    console.log('subscribing chats')
    return Chats.find(selector, options);
  });

  Meteor.methods({
    'chats.initPrivate'(firstUser, secondUser){
      const chat = Chats.findOne({
        members: {$elemMatch: {_id: firstUser._id, _id: secondUser._id}}
      });

      let chatId = null;
      if(chat){
        chatId = chat._id;
      }else{
        Chats.insert({
          name: '',
          type: 'private',
          members: [
            firstUser, //assign contact user
            secondUser, //assign current loggedIn user
          ],
          lastMessage: ''
        });
      }

      return chatId;
    }
  });

}
