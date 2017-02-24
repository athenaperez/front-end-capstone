
app.controller('FavoritesCtrl', function($scope, $http, firebaseFactory, logoutFactory, $location) {

	firebaseFactory.getLocationStories()
		.then(function(data) {
		$scope.favorites = data.data
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


	$scope.logoutButton = function() {
		logoutFactory.logout()
		$location.path('/')
	}

//remove favorites from page
	$scope.removeFavorites = function(key) {
		firebaseFactory.getUser()
			.then(function(user) {
				$http.patch(`https://society-wild.firebaseio.com/user/${user.uid}/stories/${key}/.json`, {favorite: false})
					.then(function(){
					(Materialize.toast('Removed from you favorites', 3000))
					})
//rerun function that checks the stories data for true/false
						.then(function(){
						firebaseFactory.getLocationStories()
							.then(function(data) {
							$scope.favorites = data.data
							})
						})
			})


	}

})
