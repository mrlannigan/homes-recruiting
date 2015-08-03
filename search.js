(function() {
	var app = angular.module('searchApp', [])
	/*
	app.results = {};
	
	app.getResults = function() { return(app.results); };
	app.setResults = function(v) {app.results = v; };
	
	app.service("imageResults", function() {
		var results = {};
		
		
		this.setResults = function(v) {results = v; };
		return results;
	});*/
	
	app.controller('searchController', ['$scope', '$http', function($scope, $http) {
		
		//set defaults
		$scope.searchTerms = 'pugs';
		$scope.primaryImage = {index: null, url: ""};
		$scope.searchResults = "";
		$scope.searchError = null;
		
		$scope.doSearch = function() {
			$http.get('/q/' + encodeURIComponent($scope.searchTerms))
			.success(function(data, status, headers, config) {
				
				if (("images" in data) && (data.images.length)) {
					$scope.searchError = null;
					$scope.searchResults = data;
					$scope.setCurrentImg(0);
				}
				else {
					$scope.searchResults = "";
					
					if (("error" in data) && (data.error != "")) $scope.searchError = data.error;
					else $scope.searchError = "There was an error performing your search.";
				}
			
			
			}).error(function(data, status, headers, config) {
				$scope.searchResults = "";
				$scope.searchError = status;
			});
		};
		
		$scope.setCurrentImg = function(i) {
			$scope.primaryImage.index = i;
			$scope.primaryImage.url = $scope.searchResults.images[i].main;
		};
		
		$scope.goToNext = function() {
			var i = $scope.primaryImage.index;
			i++;
			
			if (i >= $scope.searchResults.images.length) alert("You have reached the last image.");
			else $scope.setCurrentImg(i);
		};
		
		$scope.goToPrevious = function() {
			var i = $scope.primaryImage.index;
			i--;
			
			if (i < 0) alert("You have reached the first image.");
			else $scope.setCurrentImg(i);
		};
	}]);
})();