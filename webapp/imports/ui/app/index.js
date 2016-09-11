import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import 'angular-ui-bootstrap';

import 'meteor/braintree';

import Login from './login';
import Home from './home';
import Navigation from './navigation';
import Thanks from './thanks';

export default angular.module('app', [angularMeteor, uiRouter, 'ui.bootstrap', Login, Home, Navigation, Thanks, 'braintree-angular'])
.config(['$locationProvider', '$stateProvider', ($locationProvider, $stateProvider) => {
	$locationProvider.html5Mode(true);

	$stateProvider.state('app', {
		abstract: true,
		template: '<div ui-view></div>',
		controller: ['$state', 'currentUser', ($state, cu) => {
			if(!cu) {
				$state.go('login.login');
			}
		}],
		resolve: {
			currentUser: ['$auth', $auth => {
				return $auth.awaitUser();
			}]
		}
	});
}])
.run(['$rootScope', '$state', ($rootScope, $state) => {
	Object.getPrototypeOf($rootScope).$state = $state;
}]);
