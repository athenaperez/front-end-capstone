app.factory('logoutFactory', function(){
	return {
			logout: function() {
				firebase.auth().signOut()
				},

			}
})
