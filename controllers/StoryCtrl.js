app.controller('StoryCtrl', function($scope, $http, firebaseFactory, $routeParams) {

	let storyKey = $routeParams.someStory
	$scope.storyInfo

	firebaseFactory.getStory(storyKey)
		.then(function(key) {
		$scope.storyInfo = key.data
		})

	$scope.addFavorites = function() {
	$http.patch(`https://society-wild.firebaseio.com/stories/${storyKey}/.json`, {favorite: true})
		.then(function() {Materialize.toast('Added to your favorites!', 3000)
		})
	}
})
