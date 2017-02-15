app.controller('StoryCtrl', function($scope, $http, firebaseFactory, $routeParams) {

	let storyKey = $routeParams.someStory
	$scope.storyInfo

	firebaseFactory.getStory(storyKey)
		.then(function(key) {
			console.log(key.data)
		$scope.storyInfo = key.data
		})
})
