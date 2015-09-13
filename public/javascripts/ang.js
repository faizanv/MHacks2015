var app = angular.module('app', []);
var controllers = {};
var factories = {};
app.controller(controllers);
app.factory(factories);
// var gun = Gun(location.origin + '/gun');
// var people = gun.get('people').set();

var countries = {
	'China' : 'PEK',
	'India' : 'DEL',
	'Canada': 'YYZ',
	'Japan' : 'HND',
	'UK'    : 'LHR',
	'Thailand' : 'BKK',
	'France' : 'CDG',
	'Germany' : 'FRA'
}

controllers.MainController = function ($scope, MainFact){
	// $scope.userInput = {};
	$scope.accountNum = '55e94a6cf8d8770528e616b2';
	// $scope.userInput.departureDate = new Date("10/22/2015");
	// $scope.userInput.returnDate = new Date("10/25/2015");
	// $scope.userInput.origin = "SFO";
	// $scope.userInput.destination = "LAX";
	// $scope.userInput.threshhold = "1250";

	// var names = {};
	// people.map().val(function(name, id){ 
	// 	if(!name){ return }
	// 	names[id] = name;
	// 	$scope.displayInfo = names;
	// 	$scope.$apply();
	//  })

	// $scope.sendData  = function(){
	// 	if($scope.userInputGun){
	// 		people.set($scope.userInputGun);
	// 		$scope.userInputGun = "";
	// 	}
	// }


	$scope.amICool = function(accountID, phoneNum){
		MainFact.amICool(accountID).success(function(data){
			$scope.accountInfo = data;
			$scope.accountInfo.phone = phoneNum;
			$scope.accountInfo.accountbalance ="$" + parseInt($scope.accountInfo.accountbalance).toLocaleString();
			// $scope.apply();
		});
	}

	$scope.gtfo = function(country){
		console.log($scope.accountInfo.address.zip);
		MainFact.getFlights($scope.accountInfo.address.zip, country.code).success(function(data){
			$scope.flightInfo = data;
		});
		MainFact.callFriend($scope.accountInfo.phone, country.country).success(function(data){
			$scope.flightInfo = data;
		});
	}




}

factories.MainFact = function($http){
	var services = {};

	services.getFlights = function(zip, destination){
		return $http.get('/api/flight?zip='+zip+"&destination="+destination);
	}

	services.callFriend = function(phoneNumber, mp3Url){

	}

	services.amICool = function(accountID){
		return $http.get('/api/amICool?accountID=' +accountID);
	}


	return services;
}