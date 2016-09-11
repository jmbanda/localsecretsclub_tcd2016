Braintree = Npm.require('braintree');

var resources = {
	address : ['create', 'delete', 'find', 'update'],
	clientToken : ['generate'],
	customer : ['create', 'delete', 'find', 'search', 'update'],
	merchantAccount : ['create', 'find', 'update'],
	paymentMethod : ['create', 'delete', 'find', 'update'],
	plan : ['all'],
	subscription : ['cancel', 'create', 'find', 'search', 'update'],
	transaction : ['cancelRelease', 'cloneTransaction', 'find', 'holdInEscrow', 'refund', 'releaseFromEscrow', 'sale', 'search', 'submitForSettlement', 'void']
};

var options = _.extend(Meteor.settings.braintree, {environment: Meteor.settings.braintree.sandbox? Braintree.Environment.Sandbox : Braintree.Environment.Production});

delete options.sandbox;

braintree = Braintree.connect(options);

_.each(resources, function(resource, key) {
	_.each(resource, function(funcName) {
		var func = braintree[key][funcName];

		braintree[key][funcName] = Meteor.wrapAsync(func, braintree[key]);
	});
});
