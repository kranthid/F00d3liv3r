angular.module('starter.services', [])

.factory('Menu', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var menu = [{
    id: 0,
    name: 'BREAKFAST',
    lastText: '',
    face: 'img/bonda.png'
  }, {
    id: 1,
    name: 'SNACKS',
    lastText: '',
    face: 'img/dosa.png'
  }, {
    id: 2,
    name: 'SANDWICHES',
    lastText: '',
    face: 'img/chapati.png'
  }, {
    id: 3,
    name: 'VEGETARIAN',
    lastText: '',
    face: 'img/puri.png'
  }, {
    id: 4,
    name: 'NON-VEGETARIAN',
    lastText: '',
    face: 'img/juice.png'
  }];

  return {
    all: function() {
      return menu;
    },
    remove: function(chat) {
      menu.splice(menu.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < menu.length; i++) {
        if (menu[i].id === parseInt(chatId)) {
          return menu[i];
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
      menu.splice(menu.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < menu.length; i++) {
        if (menu[i].id === parseInt(chatId)) {
          return menu[i];
        }
      }
      return null;
    }
  };
});

