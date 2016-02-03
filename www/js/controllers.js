/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['ngCart', 'ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, $rootScope) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    $rootScope.shipping = {};

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('MainActivityCtrl', function($scope, $stateParams, $state, $timeout, $cordovaGeolocation, $ionicHistory, $ionicPopup) {
    var geocoder = new google.maps.Geocoder();
    var posOptions = {timeout: 5000, enableHighAccuracy: true};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {


            var lat  = position.coords.latitude
        var long = position.coords.longitude
        console.log(lat, long);
        var LatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              $scope.showLocation(LatLng);
        }, function(err) {
          // error
          console.log("getCurrentPosition: ERROR"+ err.toString());


            $ionicPopup.confirm({
                        title: "GPS is Disable Please Enable it.",
                        content: "Go to setting and turn it ON"
                    })
                    .then(function(result) {
                        if(result) {
                            //cordova.plugins.diagnostic.switchToLocationSettings();
                            ionic.Platform.exitApp();
                        }else{
                            ionic.Platform.exitApp();
                        }
                    });
        });

    $scope.showLocation = function(LatLng, $rootScope){
            geocoder.geocode({'latLng': LatLng}, function(results, status){
                if(status == google.maps.GeocoderStatus.OK){
                    //vm.myLocation = results[0].formatted_address;
                    $scope.myLocation = results[0].formatted_address;
                    //console.log($scope.myLocation);
                    $cordovaGeolocation.setLocation($scope.myLocation);
                    console.log($cordovaGeolocation.getLocation());
                    //$rootScope.shipping.address = $cordovaGeolocation.getLocation();
                    //console.log("Location:"+$rootScope.shipping.address);
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go('login');
                }
            })
      }
})

.controller('RatingCtrl', function($scope) {
    $scope.rating = 5;

    $scope.rateFunction = function( rating )
    {
           var _url = 'your service url';
     
             var data = {
               rating: rating
             };
             alert('Rating selected - ' + rating);
             /*$http.post( _url, angular.toJson(data), {cache: false} )
              .success( function( data )
              {
               success(data);
              })
              .error(function(data){
                error(data);
              });*/
     
    };

  })

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk,SignUpIn,$state) {
    //$scope.$parent.clearFabs();

    $scope.showSignup = true;

    $scope.signupUser = function(userData){
        return SignUpIn.registerUser(userData).then(function(res){
            if(res.data.email && res.data.username){
                localStorage.setItem("username",res.data.username)
                localStorage.setItem("useremail",res.data.email)
                localStorage.setItem("usermobile",res.data.mobile)
                $state.go('app.menu');
            }
        },function(err){
            console.log("err is >>>",err);
            $scope.signupStatus = "Please try after some time"
        })
    }
    $timeout(function() {
        //$scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('MenuCtrl', function($scope, $stateParams, $timeout, Menu, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    //get Menu list
    $scope.menu = Menu.all();
    /*Menu.all().then(function(res){
        $scope.menu = res.data
    },function(err){
        console.log("err is >>>",err);
        $scope.menu = [];
    })*/
    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    //ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, Menu, Cusines, ngCart, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    //
    $scope.menu = Menu.get($stateParams.chatId);
    $scope.food_details = Cusines.all();
    $scope.cartColor = (ngCart.$cart.items.length)?true:false;
    $scope.cartCount = (ngCart.$cart.items.length);
    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);



    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    /*ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });*/

})

.controller('GalleryFABCtrl', function($scope, $stateParams, $timeout, Menu, Cusines, ngCart, ionicMaterialInk, ionicMaterialMotion) {
    $scope.cartCount = (ngCart.getTotalItems());

   $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 900);
    

})

.controller('CartCtrl', function($scope, ngCart, ionicMaterialInk, ionicMaterialMotion, $rootScope,Orders) {
    $scope.title="Cart"
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    //
    //$scope.menu = Menu.get($stateParams.chatId);
    //$scope.food_details = Cusines.all();
    //$scope.cartColor = (ngCart.$cart.items.length)?true:false;
    //ngCart.setTaxRate(7.5);
    //ngCart.setShipping(2.99);

    //console.log($rootScope.address);


    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    /*ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });*/


    $scope.roundNumber = function(n){
        return Math.floor(n);
    }

  $scope.payMoney = function(shippingAddress){
    console.log("address is >>>",ngCart.toObject());
    console.log("This data has to send for the server >>>"+JSON.stringify(ngCart.toObject()));
    var details = {wholeObj:JSON.stringify(ngCart.toObject())}
    var detailsArr = [];
    detailsArr.push(ngCart.toObject());
    var orderObj = {
        email: localStorage.getItem("useremail"),
        contact:localStorage.getItem("usermobile"),
        address:document.getElementById('address').value,
        details:detailsArr
        }
        return Orders.makeOrder(orderObj).then(function(res){
            if(res.data){
                console.log("Order was done successfully >>",res.data);
            }
        },function(err){
            console.log("err is >>>",err);
            $scope.orderStatus = "Please try after some time"
        })
    }
})

;
