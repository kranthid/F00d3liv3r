angular.module('starter.controllers', ['ngCart'])

.controller('SignInCtrl', function($scope, $state) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('tab.home');
  };
  
})

.controller('DashCtrl', function($scope) {})
.controller('CartCtrl', function($scope,ngCart) {
  $scope.title="Cart Page"
  $scope.payMoney = function(){
    console.log("This data has to send for the server >>>"+JSON.stringify(ngCart.toObject()));
  }
})


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,Cusines,ngCart) {
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.food_details = Cusines.all();
  $scope.cartColor = (ngCart.$cart.items.length)?true:false;
    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);  
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
