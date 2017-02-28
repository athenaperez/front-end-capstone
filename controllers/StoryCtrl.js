app.controller('StoryCtrl', function($scope, $http, firebaseFactory, $routeParams) {

	let storyKey = $routeParams.someStory
	$scope.storyInfo

	firebaseFactory.getStory(storyKey)
		.then(function(key) {
		$scope.storyInfo = key.data
		})

//checks for logged in user to display hello
	firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    $scope.loggedOnUser = user
		    firebaseFactory.getCurrentUser($scope.loggedOnUser.uid)
		    	.then(function(data){
		    		$scope.userInformation = data.data
		    	})
		    }
	})

	$scope.addFavorites = function() {
	$http.patch(`https://society-wild.firebaseio.com/stories/${storyKey}/.json`, {favorite: true})
		.then(function() {Materialize.toast('Added to your favorites!', 3000)
		})
	}


})
