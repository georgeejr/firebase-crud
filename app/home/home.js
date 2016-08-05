'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'homeCtrl'
  });
}])

.controller('homeCtrl', ['$scope','$firebaseArray', function($scope,$firebaseArray) {
  var ref = new Firebase("https://georgeejr.firebaseio.com/georgeejr");
  $scope.contacts = $firebaseArray(ref);
  $scope.addFormShow = true;
  $scope.editFormShow = false;
  $scope.selected = [];


  $scope.addContact = function() {
    console.log("adding contact...");
    $scope.contacts.$add({
        name: $scope.name,
        email: $scope.email,
        phone: $scope.phone
    }).then(function(ref){
        var id = ref.key();
        console.log("added contact" + id);
        $scope.name = "";
        $scope.email = "";
        $scope.phone = "";

    });
  }
  $scope.showContact = function(contact){
    $scope.addFormShow = false;
    $scope.editFormShow = true;
    $scope.id = contact.$id;
    $scope.name = contact.name;
    $scope.email = contact.email;
    $scope.phone = contact.phone;
  }
  $scope.updateContact = function(){
    var id = $scope.id;
    var record = $scope.contacts.$getRecord(id);

    record.name = $scope.name;
    record.email = $scope.email;
    record.phone = $scope.phone;

    //update
    $scope.contacts.$save(record).then(function(ref){
          console.log(ref.key);
    });
    $scope.name = "";
    $scope.email = "";
    $scope.phone = "";
    $scope.addFormShow = true;
    $scope.editFormShow = false;
  }
  $scope.deleteContact = function(contact){
    $scope.contacts.$remove(contact);
  }






  //data table
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };
  function success(contacts) {
    $scope.contacts = contacts;
  }

  $scope.getContacts = function () {
    $scope.promise = $contacts.get($scope.query, success).$promise;
  };
  
}]);