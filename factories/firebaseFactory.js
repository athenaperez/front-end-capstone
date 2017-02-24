
app.factory('firebaseFactory', function($http, $q){
	return {
		sendInput: function(data) {
			return $http.post(`https://society-wild.firebaseio.com/stories.json`, data)
		},
		sendInputUserSpecific: function(data, userID, newStory) {
			return this.getUser().then(user => {
				return $http.patch(`https://society-wild.firebaseio.com/user/${user.uid}/stories/${newStory}.json`, data)
			})
		},

		getInitialStories: function() {
			return $http.get(`https://society-wild.firebaseio.com/initialStories.json`)
		},

		getLocationStories: function() {
			return this.getUser().then(user => {
				return $http.get(`https://society-wild.firebaseio.com/user/${user.uid}/stories.json`)
			})
		},

		getAllLocationStories: function() {
				return $http.get(`https://society-wild.firebaseio.com/stories.json`)
		},

		getStory: function(key) {
				return $http.get(`https://society-wild.firebaseio.com/stories/${key}.json`)
		},

		sendUserInfo: function(data) {
			return this.getUser().then(user => {
				return $http.patch(`https://society-wild.firebaseio.com/user/${user.uid}/.json`, data)
			})
		},

		getCurrentUser: function() {
			return this.getUser().then(user => {
				return $http.get(`https://society-wild.firebaseio.com/user/${user.uid}.json`)
			})
		},

// promise, that resolves with user object, or rejects if not logged in.
		getUser () {
	        return $q((resolve, reject) => {
	          // http://stackoverflow.com/questions/37370224/firebase-stop-listening-onauthstatechanged
	          const unsubscribe = firebase.auth().onAuthStateChanged(user => {
	            unsubscribe()
	            if (user) {
	              resolve(user)
	            } else {
	              reject('Not logged in')
	            }
	          })
	        })
      	},
	}

})
