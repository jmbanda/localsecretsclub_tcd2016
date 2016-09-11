angular.module('braintree-angular', [])
.factory('$braintree', ['clientTokenMethod', '$meteor', function(clientTokenMethod, $meteor) {
	var $braintree = {
		clientToken: null,
		getClientToken: function() {
			return $meteor.call(clientTokenMethod);
		},
		setupDropin: function(options) {
			$braintree.getClientToken().then(function(token) {
				braintree.setup(token, 'dropin', options);
			}, function(err) {
				console.error('error fetching client token at ' + clientTokenMethod, err);
			});
		},
		setupPayPal: function(options) {
			$braintree.getClientToken().then(function(token) {
				braintree.setup(token, 'paypal', options);
			}, function(err) {
				console.error('error fetching client token at ' + clientTokenMethod, err);
			});
		}
	};

	Object.keys(braintree).forEach(function(k) {
		$braintree[k] = braintree[k];
	});

	return $braintree;
}])
.directive('braintreeDropin', function() {
	return {
		restrict: 'AEC',
		scope: {
			options: '='
		},
		template: '<div id="bt-dropin"></div>',
		controller: ['$scope', '$braintree', function($scope, $braintree) {
			var options = $scope.options || {};
			options.container = 'bt-dropin';

			$braintree.setupDropin(options);
		}]
	}
})
.directive('braintreePaypal', function() {
	return {
		restrict: 'AEC',
		scope: {
			options: '='
		},
		template: '<div id="bt-paypal"></div>',
		controller: ['$scope', '$braintree', function($scope, $braintree) {
			var options = $scope.options || {};
			options.container = 'bt-paypal';

			$braintree.setupPayPal(options);
		}]
	}
});
