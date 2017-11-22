'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AureliaLeafletException = exports.AureliaLeafletException = function AureliaLeafletException(message) {
  _classCallCheck(this, AureliaLeafletException);

  this.name = 'AureliaLeafletException';

  this.message = message;
};