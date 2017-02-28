
app.controller('MainCtrl', function($scope, firebaseFactory, $http) {

// activating all modals on page
	$('.modal').modal();

// retrieve first 3 stories from firebase & make available for populating
	firebaseFactory.getInitialStories()
		.then(function(val) {
			$scope.storyList = val.data
		})




// __________________________________________
// retrieve stories from firebase and make available for poulating
	firebaseFactory.getAllLocationStories()
		.then(function(val) {
			$scope.locationList = val.data
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





// __________________________________________
//register functions
	$scope.loginButton = function() {
		firebase.auth().signInWithEmailAndPassword($scope.loginUsername, $scope.loginPassword).catch(function(error) {
			alert("error" + error.message)
		})
	}
// register functions
	$scope.joinButton = function() {
		firebase.auth().createUserWithEmailAndPassword($scope.registerEmail, $scope.registerPassword)
			.then(function(data) {
				$scope.user = data
			})
// send register info to firebase
			.then(function() {
				$scope.userData = {
					firstName: $scope.registerFirstName,
					lastName: $scope.registerLastName,
					zipcode: $scope.registerZipcode,
					username: $scope.registerUsername,
				}
				firebaseFactory.sendUserInfo($scope.userData, $scope.user.uid)
			})
			.catch(function(error) {
				alert("error" + error.message)
			})
	}
	// add favorites to favorite page/change favorite key/value to true
	$scope.addFavorites = function(key, uid) {
		$http.patch(`https://society-wild.firebaseio.com/user/${uid}/stories/${key}/.json`, {favorite: true})
		.then(console.log)
		.then(() => Materialize.toast('Added to your favorites!', 3000))

	}

// delete story/card
	$scope.deleteStory = function(key) {
    	if (confirm("Are you sure you want to delete this location?")) {
			$http.delete(`https://society-wild.firebaseio.com/user/${$scope.loggedOnUser.uid}/stories/${key}/.json`)
			$http.delete(`https://society-wild.firebaseio.com/stories/${key}/.json`)


// refresh page to remove card immediately
			.then(function(){
				firebaseFactory.getAllLocationStories()
					.then(function(val) {
						$scope.locationList = val.data
					})
			})

		}
	}



})








