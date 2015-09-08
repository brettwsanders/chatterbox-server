var nextId = 1;

var Message = function(roomname, text, username) {
  this.roomname = roomname;
  this.text = text;
  this.username = username;
  this.objectId = nextId;
  nextId++;
  this.createdAt = new Date();
};

Message.prototype = constructor;


var Messages = function() {
  this.data = [];
};

Messages.prototype = {
  constructor: Messages,

  addMessage: function(message) {
    this.data.push(message);
  }
};

exports.Message = Message;
exports.Messages = Messages;



// var messages = [
//   {
//     "createdAt":"2015-09-07T22:18:30.745Z",
//     "objectId":"a4IgVFOR43",
//     "roomname":"lobby",
//     "updatedAt":"2015-09-07T22:18:30.745Z",
//     "username":"Brett"
//   },
//   {
//     "createdAt":"2015-09-07T22:07:51.021Z",
//     "objectId":"2pamrneV9F",
//     "roomname":"all",
//     "text":"this is working",
//     "updatedAt":"2015-09-07T22:07:51.021Z",
//     "username":"taylor"
//   }];
