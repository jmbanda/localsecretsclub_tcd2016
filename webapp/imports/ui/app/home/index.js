import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {Meteor} from 'meteor/meteor';

import templateUrl from './template.html';

class HomeController {
	constructor($scope, $reactive, $sce, $compile) {
		$reactive(this).attach($scope);

		this.platform = new H.service.Platform(Meteor.settings.public.here);
		const defaultLayers = this.platform.createDefaultLayers();

		this.$scope = $scope;
		this.$compile = $compile;
		this.$sce = $sce;
		this.filter = '';
		this.objects = [];
		this.map = new H.Map(document.getElementById('map'), defaultLayers.normal.map);

		new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

		this.ui = H.ui.UI.createDefault(this.map, defaultLayers);

		const opts = {
			icon: new H.map.Icon('<svg width="27px" height="28px" viewBox="0 0 27 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M8.46153846,17.7692308 C13.0497502,17.7692308 16.7692308,13.8431124 16.7692308,9 C16.7692308,4.15688758 13.0497502,0.230769231 8.46153846,0.230769231 C3.87332669,0.230769231 0.153846154,4.15688758 0.153846154,9 C0.153846154,13.8431124 3.87332669,17.7692308 8.46153846,17.7692308 Z" id="path-1"></path><filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-2"><feMorphology radius="1.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology><feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g id="Mobile-App" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="01-Home" transform="translate(-117.000000, -380.000000)"><g id="Start---Your-Location" transform="translate(122.000000, 383.000000)"><g id="Oval-2"><use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use><use stroke="#FFFFFF" stroke-width="3" fill="#007CD6" fill-rule="evenodd" xlink:href="#path-1"></use></g></g></g></g></svg>')
		};

		if(/*navigator.geolocation*/false) {
			navigator.geolocation.getCurrentPosition(position => {
				this.point = {lat: position.coords.latitude, lng: position.coords.longitude};

				this.map.setCenter(this.point);
				this.addMarker(this.point, opts, true);
			});
		} else {
			this.point = {lat:37.7756433, lng:-122.3867432};
			this.map.setCenter(this.point);
			this.addMarker(this.point, opts, true);
		}

		this.map.setZoom(14);

		const vm = this;
		$scope.showDetails = function() {
			vm.details = vm.place.details;
			vm.bubble.close();
		}
	}

	addMarker(point, options, permanent) {
		const userMarker = new H.map.Marker(point, options);

		const obj = this.map.addObject(userMarker);
		if(!permanent) {
			this.objects.push(obj);
		}
	}

	search() {
		this.map.removeObjects(this.objects);
		this.objects = [];

		this.call('search', this.filter, this.point, (err, place) => {
			if(err) {
				return alert(err.message);
			}

			if(!place) {
				return alert('No places found');
			}

			this.place = place;

			const dest = place.loc.coordinates;

			const marker = new H.map.Marker({
				lat: dest[1],
				lng: dest[0],
			}, {
				icon: new H.map.Icon('<svg width="27px" height="34px" viewBox="0 0 27 34" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Mobile-App" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="03-Select-the-place" transform="translate(-91.000000, -248.000000)"><g id="Place-icon" transform="translate(91.000000, 248.000000)"><circle id="Oval-3" fill="#FFFFFF" cx="13" cy="14" r="12"></circle><path d="M0.259615385,13.3939394 C0.259615385,15.3 0.778846154,17.3090909 1.35,18.7 C5.34807692,27.2 13.1884615,33.7939394 13.5,33.7939394 C13.8115385,33.7939394 21.6519231,27.2 25.65,18.5969697 C26.2211538,17.2060606 26.7403846,15.1969697 26.7403846,13.2909091 C26.7403846,6.07878788 20.8211538,0.206060606 13.5,0.206060606 C6.17884615,0.206060606 0.259615385,6.07878788 0.259615385,13.3939394 Z M13.5,24.0060606 C7.52884615,24.0060606 2.7,19.2151515 2.7,13.2909091 C2.7,7.36666667 7.52884615,2.57575758 13.5,2.57575758 C19.4711538,2.57575758 24.3,7.36666667 24.3,13.2909091 C24.3,19.2151515 19.4711538,24.0060606 13.5,24.0060606 L13.5,24.0060606 Z" id="Shape" fill="#007CD6"></path></g></g></g></svg>')
			});

			const group = new H.map.Group();

			this.objects.push(this.map.addObject(group));

			group.addObject(marker);

			this.map.addObject(group);

			const content = this.$compile('<div style="position: relative"><img src="/u1.png"><span style="position:absolute;color:#000;font-size:12px;width:170px;left:10px;top:65px;text-align:center">' + place.name + '</span><a class="btn btn-primary" style="position: absolute; left: 45px; bottom: 25px" ng-click="showDetails()">See Details</a></div>')(this.$scope);
			this.$scope.$apply();

			const bubble = new H.ui.InfoBubble({
				lat: dest[1],
				lng: dest[0],
			}, {
				content: content[0]
			});
			this.ui.addBubble(bubble);
			this.bubble = bubble;

			const params = {
				mode: 'fastest;pedestrian',
				representation: 'display',
				routeattributes : 'waypoints,summary,shape,legs',
				maneuverattributes: 'direction,action',
				waypoint0: this.point.lat + ',' + this.point.lng,
				waypoint1: dest[1] + ',' + dest[0]
			};

			this.platform.getRoutingService().calculateRoute(params, this.$bindToContext(result => {
				// Route shape
				this.traceRoute(result.response.route[0]);

//				this.showDetails(place);
			}), err => {
				console.log(err);
			});
		});
	}

	openBubble(position, text) {
		if(!this.bubble) {
			this.bubble = new H.ui.InfoBubble(position, {content: text})
			this.ui.addBubble(this.bubble);
		} else {
			this.bubble.setPosition(position);
			this.bubble.setContent(text);
			this.bubble.open();
		}
	}

	traceRoute(route) {
		const strip = new H.geo.Strip(),
			routeShape = route.shape;

		route.shape.forEach(point => {
			const parts = point.split(',');

			strip.pushLatLngAlt(parts[0], parts[1]);
		});

		const polyline = new H.map.Polyline(strip, {
			style: {
				lineWidth: 4,
				strokeColor: 'rgba(0, 128, 255, 0.7)'
			}
		});

		this.objects.push(this.map.addObject(polyline));
		this.map.setViewBounds(polyline.getBounds(), true);

		// Manouvers
		const svgMarkup = '<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="4" fill="#1b468d" stroke="white" stroke-width="1"  /></svg>',
			dotIcon = new H.map.Icon(svgMarkup, {anchor: {x:8, y:8}}),
			group = new  H.map.Group();

		route.leg.forEach(leg => {
			leg.maneuver.forEach(maneuver => {
				const marker = new H.map.Marker({
					lat: maneuver.position.latitude,
					lng: maneuver.position.longitude
				}, {icon: dotIcon});

				marker.instruction = maneuver.instruction;

				group.addObject(marker);
			});
		});

		group.addEventListener('tap', e => {
			this.map.setCenter(e.target.getPosition());
			this.openBubble(e.target.getPosition(), e.target.instruction);
		}, false);

		this.objects.push(this.map.addObject(group));
	}

	showDetails(place) {
		console.log(place);
		this.details = place.details;
	}

	cleanSce(html) {
		return this.$sce.trustAsHtml(html);
	}
}

const name = 'app.home';

export default name;

angular.module(name, [angularMeteor, uiRouter])
.config(['$stateProvider', ($stateProvider) => {
	$stateProvider.state('app.home', {
		url: '/home',
		templateUrl,
		controllerAs: 'h',
		controller: ['$scope', '$reactive', '$sce', '$compile', HomeController]
	});
}]);
