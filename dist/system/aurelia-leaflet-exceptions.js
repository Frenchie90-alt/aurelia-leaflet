'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var AureliaLeafletException;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('AureliaLeafletException', AureliaLeafletException = function AureliaLeafletException(message) {
        _classCallCheck(this, AureliaLeafletException);

        this.name = 'AureliaLeafletException';

        this.message = message;
      });

      _export('AureliaLeafletException', AureliaLeafletException);
    }
  };
});