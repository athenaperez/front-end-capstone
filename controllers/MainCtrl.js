console.log("MainCtrl loaded 2")

app.controller('MainCtrl', function($scope, firebaseFactory) {
	firebaseFactory.getInitialStories()
		.then(function(val) {
			console.log(val.data)
			$scope.storyList = val.data
		})
})

