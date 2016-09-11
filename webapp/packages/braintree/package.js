Npm.depends({
	'braintree': '1.31.0'
});

Package.onUse(function(api) {
	api.use('underscore', 'server');

	api.addFiles('braintree-node.js', 'server');
	api.addFiles(['braintree.js', 'braintree-angular.js'], 'client');

	api.export(['Braintree', 'braintree'], 'server');
});
