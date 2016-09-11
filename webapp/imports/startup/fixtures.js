import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {ServiceConfiguration} from 'meteor/service-configuration';

import {Places} from '/imports/api/places';

Meteor.startup(() => {
	if(ServiceConfiguration.configurations.find({service: 'facebook'}).count()===0) {
		ServiceConfiguration.configurations.insert({
			service: 'facebook',
			appId: '282153778833984',
			secret: 'af30fe9975e747d77b7b2f992af99b06'
		});
	}

	if(Meteor.users.find({username: 'marcantuan'}).count()===0) {
		var _id = Accounts.createUser({
			username: 'marcantuan',
			password: 'marcantuan'
		});

		Meteor.users.update(_id, {$set: {profile: {name: 'Marc-Antuan'}}});
	}

	Places._ensureIndex({'loc.coordinates': '2dsphere'});

	if(Places.find().count()===0) {
		const data = Assets.getText('data.csv');

		data.split("\n").forEach(line => {
			line = line.replace('Theatre, Music & Culture', 'Theatre; Music & Culture');
			const row = line.split(',');

			const place = Places.findOne({name: row[1]});

			if(place) {
				if(row[5]!='') Places.update(place._id, {$addToSet: {keywords: row[5]}});
			} else {
				const keywords = [];

				if(row[5]!='') keywords.push(row[5]);

				Places.insert({
					name: row[1],
					type: row[2].replace('Theatre; Music & Culture', 'Theatre, Music & Culture'),
					loc: {
						type: 'Point',
						coordinates: [Number(row[4]), Number(row[3])]
					},
					keywords
				})
			}
		});
	}

	if(Places.find({image: null}).count()>0) {
		const images = Assets.getText('images.csv');

		images.split("\n").forEach(line => {
			const row = line.split(',');

			Places.update({name: row[0], image: null}, {$set: {image: row[1]}});
		});
	}
});
