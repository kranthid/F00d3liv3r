angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'BREAKFAST',
    lastText: '',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'SNACKS',
    lastText: '',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'SANDWICHES',
    lastText: '',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'VEGETARIAN',
    lastText: '',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'NON-VEGETARIAN',
    lastText: '',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('Cusines', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var breakfast_items = [{
    id: 0,
    name: 'Dosa',
    lastText: '',
    face: 'img/dosa.png',
    price:30
  }, {
    id: 1,
    name: 'Puri',
    lastText: '',
    face: 'img/puri.png',
    price:40
  }, {
    id: 2,
    name: 'Chapathi',
    lastText: '',
    face: 'img/chapati.png',
    price:30
  }, {
    id: 3,
    name: 'Rice Items',
    lastText: '',
    face: 'img/rice.png',
    price:20
  }, {
    id: 4,
    name: 'Bonda',
    lastText: '',
    face: 'img/bonda.png',
    price:30
  },
  {
    id: 5,
    name: 'Juice',
    lastText: '',
    face: 'img/juice.png'
  }];

  return {
    all: function() {
      return breakfast_items;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

