
app.controller('WriteStoryCtrl', function($scope, firebaseFactory, $location) {
	$scope.data = {
		dropDownOne: null
	}
	// declare image outside of image upload scope
		var image;

		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    $scope.loggedOnUser = user
		  } else {
 			console.log("not logged in")
		  }
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


	// sending story data to firebase on button click
		$scope.buttonClick = function() {
			var newStory;
			let data = {
				title: $scope.inputTitle,
				draw: $scope.theDraw,
				pack: $scope.thePackList,
				description: $scope.theDescription,
				dropDownOne: document.querySelector('#dropDownOne').value,
				image: image,
				favorite: false,
				uid: $scope.loggedOnUser.uid
			}



	//firebaseFactory - send data to firebase
			firebaseFactory.sendInput(data)
			.then(function(data){
				newStory = data.data.name
			})
			.then(Materialize.toast('Your post is ready to view!', 4000))

	// send page to new story just created
			.then(function(data){
				$location.path(`/story/${newStory}`)
				})
//
			.then(function(){
			firebaseFactory.sendInputUserSpecific(data, $scope.loggedOnUser.uid, newStory)
			})
		}




	// ___IMGAGE UPLOAD____________________________
		let storageRef = firebase.storage().ref();

		let inputElement = document.getElementById('fileInput');

		inputElement.addEventListener("change", handleFiles, false);

		function handleFiles() {
			console.log("sup handleFiles")
			var fileList = this.files;
				storageRef.child(fileList[0].name).put(fileList[0])
					.then(function(snapshot) {
	//getting the url
						  storageRef.child(fileList[0].name).getDownloadURL()
						    	.then(function(url) {
						      var img = document.getElementById('upload-placeholder-img');
						      image = url;
						      img.src = url;
						    })
						    .catch(function(error) {
						    })
					});
		}
	// ________END IMAGE UPLOAD AND DISPLAY_______________


});


// dropdown options for writeStory
  $(document).ready(function() {
    $('select').material_select();
  });


