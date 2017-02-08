console.log("firebase Factory works 5")

app.factory('firebaseFactory', function($http){
	return {
		sendInput: function(data) {
			return $http.post(`https://society-wild.firebaseio.com/user.json`, data)
		}
	}
})
