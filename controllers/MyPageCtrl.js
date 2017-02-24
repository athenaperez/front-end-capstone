
app.controller('MyPageCtrl', function($scope, $http, firebaseFactory, logoutFactory, $location) {

// ______________________________________________________
// retrieve first 3 stories from firebase & make available for populating
	firebaseFactory.getInitialStories()
		.then(function(val) {
		$scope.storyList = val.data
		})

// ______________________________________________________
//checks to see if user logs in or out
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
		    $scope.loggedOnUser = user
		    firebaseFactory.getUser($scope.loggedOnUser.uid)
		    	.then(function(data){
		    		$scope.userInformation = data.data
				})
				firebaseFactory.getCurrentUser($scope.loggedOnUser.uid)
		    	.then(function(data){
		    		$scope.userInformation = data.data
		    	})




// ______________________________________________________
// retrieve stories from firebase and make available for poulating
		    	.then(function(){
					firebaseFactory.getLocationStories($scope.loggedOnUser.uid)
						.then(function(val) {
							$scope.locationList = val.data
						})
		    	})

		  } else {
 			console.log("not logged in")
		  }
		})

// ______________________________________________________
// add favorites to favorite page/change favorite key/value to true
	$scope.addFavorites = function(key) {
		$http.patch(`https://society-wild.firebaseio.com/stories/${key}/.json`, {favorite: true})
		.then(console.log)
		.then(Materialize.toast('Added to your favorites!', 3000))
	}

// ______________________________________________________
// delete story/card
	$scope.deleteStory = function(key) {
    	if (confirm("Are you sure you want to delete this location?")) {
			$http.delete(`https://society-wild.firebaseio.com/user/${$scope.loggedOnUser.uid}/stories/${key}/.json`)
			$http.delete(`https://society-wild.firebaseio.com/stories/${key}/.json`)

// refresh page to remove card immediately
		.then(function(){
			firebaseFactory.getLocationStories()
				.then(function(key) {
				$scope.locationList = key.data
				})
			})
		}
	}

// ______________________________________________________
		$scope.logoutButton = function() {
		logoutFactory.logout()
		$location.path('/')
	}

})
