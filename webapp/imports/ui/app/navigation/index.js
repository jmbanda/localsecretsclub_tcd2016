import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-ui-bootstrap';

import {Meteor} from 'meteor/meteor';

import templateUrl from './template.html';

class AdminNavigation {
	constructor($scope, $reactive, $state) {
		'ngInject';

		this.$state = $state;

		$reactive(this).attach($scope);

		this.helpers({
			user() {
				return Meteor.user();
			}
		});
	}

	logout() {
		Meteor.logout(() => {
			this.$state.go('login.login');
		});
	}
}

const name = 'app.navigation';

export default name;

angular.module(name, [angularMeteor, 'ui.bootstrap'])
.component('navi', {
	templateUrl,
	controllerAs: 'nav',
	controller: ['$scope', '$reactive', '$state', AdminNavigation]
});
