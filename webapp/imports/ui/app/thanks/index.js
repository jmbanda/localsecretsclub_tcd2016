import {Meteor} from 'meteor/meteor';

import templateUrl from './template.html';

class ThanksController {
	constructor($scope, $reactive, $timeout) {
		$reactive(this).attach($scope);

		this.$timeout = $timeout;
		this.$scope = $scope;
		this.step = 1;
		this.disablePay = true;

		$scope.paymentForm = {};
	}

	cancel(c) {
		window.history.back(c);
	}

	pay() {
		this.step = 2;

		const vm = this;

		this.call('payment-token', (err, token) => {
			if(err) {
				return alert(err.message);
			}

			braintree.setup(token, 'dropin', {
				container: 'payment-form',
				onPaymentMethodReceived(data) {
					vm.submit(vm.$scope.paymentForm, data.nonce);
				},
				onReady() {
					vm.$timeout(() => {
						vm.disablePay = false;
					}, 0);
				},
				onError(type, message) {
					alert(message);
				}
			});
		});
	}

	submit(form, nonce) {
		if(form.$valid) {
			this.call('execute-payment', nonce, this.amount, (err, res) => {
				if(err) {
					return alert(err.message);
				}

				alert('Your payment has been received. Thank you!!');

				window.history.back();
			});
		}
	}
}

const name = 'app.thanks';

export default name;

angular.module(name, [])
.config(['$stateProvider', ($stateProvider) => {
	$stateProvider.state('app.thanks', {
		url: '/thanks/:u',
		templateUrl,
		controllerAs: 't',
		controller: ['$scope', '$reactive', '$timeout', ThanksController]
	});
}]);
