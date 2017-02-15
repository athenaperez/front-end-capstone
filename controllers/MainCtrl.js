console.log("MainCtrl loaded 2")

app.controller('MainCtrl', function($scope, firebaseFactory, $http) {
	// activating all modals on page
	$('.modal').modal();

	firebaseFactory.getInitialStories()
		.then(function(val) {
			console.log(val.data)
			$scope.storyList = val.data
		})
	firebaseFactory.getLocationStories()
		.then(function(val) {
			console.log(val.data)
			$scope.locationList = val.data
			console.log($scope.locationList)
		})


// testing login/register functions
	$scope.loginButton = function() {
		console.log("login button works")
	}
	$scope.joinButton = function() {
		console.log("join button works")
	}

	$scope.addFavorites = function(key) {
		$http.patch(`https://society-wild.firebaseio.com/stories/${key}/.json`, {favorite: true})
		.then(console.log)
		.then(Materialize.toast('Added to your favorites!', 3000))
	}
	$scope.deleteStory = function(key) {

    	if (confirm("Are you sure you want to delete this location?")) {
		$http.delete(`https://society-wild.firebaseio.com/stories/${key}/.json`)
		// .then(function(){
		// 	document.getElementById()
		// })
		}


	}
})

