console.log("Favorites loaded 6")

app.controller('FavoritesCtrl', function($scope, $http, firebaseFactory) {

	$scope.buttonClick = function() {
	}

	firebaseFactory.getLocationStories()
		.then(function(data) {
			console.log(data.data, "hola")
		$scope.favorites = data.data
		})

	$scope.removeFavorites = function(key) {
		$http.patch(`https://society-wild.firebaseio.com/stories/${key}/.json`, {favorite: false})
			.then(console.log)
	}

})
