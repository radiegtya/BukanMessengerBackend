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
      const doc = {
        name: '',
        type: 'private',
        members: [
          firstUser, //assign contact user
          secondUser, //assign current loggedIn user
        ],
        lastMessage: {
          createdAt: new Date()
        }
      };

      //if chat exists, upsert the chat to prevent duplicate chat that can cause data rubbish
      if(chat){
        chatId = chat._id;
        Chats.upsert(chatId, doc);
      }else{
        chatId = Chats.insert(doc);
      }

      return chatId;
    },
    'chats.initGroup'(name, members){
      const chatId = Chats.insert({
        name: name,
        type: 'group',
        members: members,
        lastMessage: {
          createdAt: new Date()
        }
      });

      return chatId;
    }
  });

}
