import angular from 'angular';
import 'bootstrap/dist/css/bootstrap.css';
import '/imports/ui/sb-admin-2.css';
import 'font-awesome/css/font-awesome.css';

import {Meteor} from 'meteor/meteor';

import '/imports/ui/app';

function onReady() {
	angular.bootstrap(document, ['app'], {strictDi: true});
}

if(Meteor.isCordova) {
	angular.element(document).on('deviceready', onReady);
} else {
	angular.element(document).ready(onReady);
}
