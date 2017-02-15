console.log("app.js is loaded 1")

const app = angular.module('societyWildApp', ['ngRoute'])

app.config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');



// initialize firebase
	  firebase.initializeApp({
	    apiKey: "AIzaSyBM_2EfogAxkFESOt14M7Un2-LU54MK7wk",
	    authDomain: "society-wild.firebaseapp.com",
	    databaseURL: "https://society-wild.firebaseio.com",
	    storageBucket: "society-wild.appspot.com",
	    messagingSenderId: "504945387116"
	  });


// routes
	$routeProvider
	.when('/', {
		controller: 'MainCtrl',
		templateUrl: 'partials/main.html'
	})
	.when('/mypage', {
		controller: 'MyPageCtrl',
		templateUrl: 'partials/myPage.html'
	})
	.when('/writestory', {
		controller: 'WriteStoryCtrl',
		templateUrl: 'partials/writeStory.html'
	})
	.when('/myfavorites', {
		controller: 'FavoritesCtrl',
		templateUrl: 'partials/myfavorites.html'
	})
	.when('/story', {
		controller: 'StoryCtrl',
		templateUrl: 'partials/story.html'
	})
	.when('/story/:someStory', {
        controller: 'StoryCtrl',
        templateUrl: 'partials/story.html'
    })
	.otherwise({
		redirectTo: '/'
	})


})



// dropdown options for writeStory
  $(document).ready(function() {
    $('select').material_select();
  });
