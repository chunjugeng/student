'use strict';
import * as Promise from 'promise';
import 'core-js/es6/map';
import 'core-js/es6/set';

if (typeof window['Promise'] === 'undefined') {
	window['Promise'] = Promise;
}
