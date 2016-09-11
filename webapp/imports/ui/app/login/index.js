import angular from 'angular';
import angularMeteorAuth from 'angular-meteor-auth';

import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

import loginTemplate from './login.html';

class Login {
	constructor($scope, $reactive, $state, $auth) {
		$reactive(this).attach($scope);

		this.loading = false;
		this.$state = $state;

		$auth.awaitUser().then(user => {
			if(user) {
				this.redirect(user);
			}
		});
	}

	redirect(user) {
		this.$state.go('app.home', {}, {reload: true});
	}
}

class LoginController extends Login {
	login() {
		Meteor.loginWithPassword(this.username, this.password, err => {
			if(err) {
				alert(err.reason || err.message);
			} else {
				this.$state.go('app.home', {}, {reload: true});
			}
		});
	}

	fbLogin() {
		Meteor.loginWithFacebook({}, err => {
			if(err) {
				return alert(err.message);
			}
			this.$state.go('app.home', {}, {reload: true});
		});
	}
}

export default name = 'login';

angular.module(name, [angularMeteorAuth])
.config(['$urlRouterProvider', '$stateProvider', ($urlRouterProvider, $stateProvider) => {
	$urlRouterProvider.otherwise('/login');

	$stateProvider.state('login', {
		abstract: true,
		url: '/login',
		template: '<div ui-view=""></div>'
	})
	.state('login.login', {
		url: '',
		templateUrl: loginTemplate,
		controller: ['$scope', '$reactive', '$state', '$auth', LoginController],
		controllerAs: 'l'
	});
}])
.run(['$rootScope', '$state', ($rootScope, $state) => {
	$rootScope.$on('$stateChangeError', (e, ts, tp, fs, fp, err) => {
		switch(error) {
			case 'AUTH_REQUIRED':
				return $state.go('login.login');
			case 'FORBIDDEN':
				return $state.go('error.403');
			case 'NOT_FOUND':
				return $state.go('error.404');
		}

		$state.go('error.500');
	});
}]);
