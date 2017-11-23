define(['exports', 'aurelia-pal'], function (exports, _aureliaPal) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;
    function configure(frameworkConfig) {
        frameworkConfig.globalResources(_aureliaPal.PLATFORM.moduleName('./leaflet'));
    }
});