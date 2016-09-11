import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';

import {Places} from './collection';

Meteor.methods({
	search(filter, coordinates) {
		const query = {$and: (filter || '').trim().replace(/\s+/, ' ').split(' ').map(token => {
			return {keywords: {$regex: token, $options: 'i'}};
		})};

		const params = {
			start0: coordinates.lat + ',' + coordinates.lng,
			app_id: Meteor.settings.public.here.app_id,
			app_code: Meteor.settings.public.here.app_code,
			mode: 'fastest;pedestrian;traffic:disabled'
		};

		const places = Places.aggregate([
			{$geoNear: {
				spherical: true,
				limit: 10,
				query,
				near: {type: 'Point', coordinates: [coordinates.lng, coordinates.lat]},
				distanceField: 'distance',
				distanceMultiplier: 0.000621371
			}}
		]);

		if(places.length===0) {
			return null;
		}

		places.forEach((place, i) => {
			params['destination' + i] = place.loc.coordinates[1] + ',' + place.loc.coordinates[0];
		});

		let res = HTTP.get('https://matrix.route.cit.api.here.com/routing/7.2/calculatematrix.json', {params});

		const matrix = res.data.response.matrixEntry.sort((a, b) => {
			if(a.summary.costFactor<b.summary.costFactor) return -1;
			if(b.summary.costFactor<a.summary.costFactor) return 1;
			return 0;
		});

		const place = places[matrix[0].destinationIndex];

		res = HTTP.get('https://places.cit.api.here.com/places/v1/discover/search', {
			params: {
				app_id: Meteor.settings.public.here.app_id,
				app_code: Meteor.settings.public.here.app_code,
				at: place.loc.coordinates[1] + ',' + place.loc.coordinates[0],
				q: place.name
			}
		});

		place.details = res.data.results.items[0];
		place.details.userId = 1;

		return place;
	}
})
