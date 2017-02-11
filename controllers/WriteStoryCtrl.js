console.log("WriteStoryCtrl loaded 4")

app.controller('WriteStoryCtrl', function($scope, firebaseFactory) {
	$scope.data = {
		dropDownOne: null
	}
// declare image outside of image upload scope
	var image;

// sending story data to firebase on button click
	$scope.buttonClick = function() {
		let data = {
			title: $scope.inputTitle,
			draw: $scope.theDraw,
			pack: $scope.thePackList,
			description: $scope.theDescription,
			dropDownOne: document.querySelector('#dropDownOne').value,
			image: image,
			favorite: false
		}
//firebaseFactory
		firebaseFactory.sendInput(data)
		.then(console.log)
		.then(Materialize.toast('Your post is ready to view!', 4000))
	}




// ___IMGAGE UPLOAD____________________________
	let storageRef = firebase.storage().ref();

	let inputElement = document.getElementById('fileInput');

	inputElement.addEventListener("change", handleFiles, false);

	function handleFiles() {
		console.log("sup handleFiles")
		var fileList = this.files;
			console.log("fileList[0]", fileList[0])
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
						console.log('Uploaded an image!!')
				});
	}
// ________END IMAGE UPLOAD AND DISPLAY_______________

});


