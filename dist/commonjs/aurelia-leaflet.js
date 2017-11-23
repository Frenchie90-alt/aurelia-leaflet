'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configure = configure;

var _aureliaPal = require('aurelia-pal');

function configure(frameworkConfig) {
    frameworkConfig.globalResources(_aureliaPal.PLATFORM.moduleName('./leaflet'));
}