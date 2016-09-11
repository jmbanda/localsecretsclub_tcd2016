import '/imports/startup/fixtures';

import {Meteor} from 'meteor/meteor';

Meteor.methods({
	'payment-token'() {
		const res = braintree.clientToken.generate({});

		if(res.success) {
			return res.clientToken;
		}

		throw new Meteor.Error(res);
	},
	'execute-payment'(nonce, amount) {
		const response = braintree.transaction.sale({
			paymentMethodNonce: nonce,
			options: {
				submitForSettlement: true
			},
			amount: parseFloat(amount.toFixed(2))
		});

		if(response.success) {
			return;
		}

		throw new Meteor.Error(422, response.message);
	}
});
