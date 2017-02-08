console.log("WriteStoryCtrl loaded 4")

app.controller('WriteStoryCtrl', function($scope, firebaseFactory) {
	$scope.buttonClick = function() {
		let data = {
			title: $scope.inputTitle,
			draw: $scope.theDraw,
			pack: $scope.thePackList,
			description: $scope.theDescription
		}
		firebaseFactory.sendInput(data)
		.then(console.log)
	}
})
