'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LeafletCustomElement = undefined;
exports.configure = configure;

var _aureliaPal = require('aurelia-pal');

var _leaflet = require('./leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configure(frameworkConfig) {
    frameworkConfig.globalResources(_aureliaPal.PLATFORM.moduleName('./leaflet'));
}

exports.LeafletCustomElement = _leaflet2.default;