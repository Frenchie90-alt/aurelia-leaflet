'use strict';

System.register(['aurelia-pal'], function (_export, _context) {
    "use strict";

    var PLATFORM;
    function configure(frameworkConfig) {
        frameworkConfig.globalResources(PLATFORM.moduleName('./leaflet'));
    }

    _export('configure', configure);

    return {
        setters: [function (_aureliaPal) {
            PLATFORM = _aureliaPal.PLATFORM;
        }],
        execute: function () {}
    };
});