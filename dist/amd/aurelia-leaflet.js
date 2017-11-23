define(['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'leaflet'], function (exports, _aureliaFramework, _aureliaEventAggregator, _leaflet) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.LeafletCustomElement = exports.defaultLayers = exports.defaultMapOptions = exports.AureliaLeafletException = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class2, _desc, _value, _class3, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class4, _temp;

  

  var AureliaLeafletException = exports.AureliaLeafletException = function AureliaLeafletException(message) {
    

    this.name = 'AureliaLeafletException';

    this.message = message;
  };

  var defaultMapOptions = exports.defaultMapOptions = {
    center: {
      lat: 47.3686498,
      lng: 8.53918250
    },
    zoomLevel: 13
  };

  var defaultLayers = exports.defaultLayers = {
    base: [{
      id: 'OSM Tiles',
      type: 'tile',
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      options: {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    }],
    overlay: []
  };

  var LeafletCustomElement = exports.LeafletCustomElement = (_dec = (0, _aureliaFramework.customElement)('leaflet'), _dec2 = (0, _aureliaFramework.useView)('./leaflet.html'), _dec(_class2 = _dec2(_class2 = (_class3 = (_temp = _class4 = function () {
    function LeafletCustomElement(leaflet, eventAggregator, element) {
      var _this = this;

      

      _initDefineProp(this, 'layers', _descriptor, this);

      _initDefineProp(this, 'mapEvents', _descriptor2, this);

      _initDefineProp(this, 'mapOptions', _descriptor3, this);

      _initDefineProp(this, 'withLayerControl', _descriptor4, this);

      _initDefineProp(this, 'withScaleControl', _descriptor5, this);

      this.attachedLayers = {
        base: {},
        overlay: {}
      };

      this.L = leaflet;
      this.eventAggregator = eventAggregator;
      this.element = element;

      this.layerFactory = new LayerFactory(this.L);

      this.mapInit = new Promise(function (resolve, reject) {
        _this.mapInitResolve = resolve;
        _this.mapInitReject = reject;
      });

      this.eventsBound = new Promise(function (resolve, reject) {
        _this.eventsBoundResolve = resolve;
        _this.eventsBoundReject = reject;
      });

      this.mapOptions = defaultMapOptions;
      this.layers = defaultLayers;
    }

    LeafletCustomElement.prototype.layersChanged = function layersChanged(newLayers, oldLayers) {
      if (oldLayers && oldLayers !== null) {
        this.removeOldLayers(oldLayers.base, 'base');
        this.removeOldLayers(oldLayers.overlay, 'overlay');
      }
      this.attachLayers();
    };

    LeafletCustomElement.prototype.mapOptionsChanged = function mapOptionsChanged(newOptions, oldOptions) {
      var _this2 = this;

      this.mapOptions = Object.assign(defaultMapOptions, newOptions);

      this.mapInit.then(function () {
        if (oldOptions) {
          if (_this2.mapOptions.center !== oldOptions.center) {
            _this2.map.setView(_this2.mapOptions.center);
          }
          if (_this2.mapOptions.zoom !== oldOptions.zoom) {
            _this2.map.setZoom(_this2.mapOptions.zoom);
          }
          if (_this2.mapOptions.maxBounds !== oldOptions.maxBounds) {
            _this2.map.setMaxBounds(_this2.mapOptions.maxBounds);
          }
        }
      });
    };

    LeafletCustomElement.prototype.mapEventsChanged = function mapEventsChanged(newEvents, oldEvents) {
      var _this3 = this;

      this.mapInit.then(function () {
        if (newEvents && newEvents.length) {
          for (var _iterator = newEvents, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var eventName = _ref;

            _this3.map.on(eventName, function (e) {
              return _this3.eventAggregator.publish('aurelia-leaflet', Object.assign(e, { map: _this3.map }));
            });
          }
        }
        if (oldEvents !== null) {
          for (var _iterator2 = oldEvents.filter(function (e) {
            return newEvents.indexOf(e) === -1;
          }), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var removedEvent = _ref2;

            _this3.map.off(removedEvent);
          }
        }
        if (!_this3.eventsBound.resolved) {
          _this3.eventsBoundResolve();
        }
      });
    };

    LeafletCustomElement.prototype.withLayerControlChanged = function withLayerControlChanged(newValue) {
      var _this4 = this;

      if (newValue === false) {
        this.mapInit.then(function () {
          if (_this4.layerControl) {
            _this4.map.removeControl(_this4.layerControl);
          }
        });
      } else {
        this.mapInit.then(function () {
          if (_this4.layerControl) {
            _this4.map.removeControl(_this4.layerControl);
          }
          _this4.layerControl = _this4.L.control.layers(_this4.attachedLayers.base, _this4.attachedLayers.overlay, newValue).addTo(_this4.map);
        });
      }
    };

    LeafletCustomElement.prototype.withScaleControlChanged = function withScaleControlChanged(newValue) {
      var _this5 = this;

      if (newValue === false) {
        this.mapInit.then(function () {
          if (_this5.scaleControl) {
            _this5.map.removeControl(_this5.scaleControl);
          }
        });
      } else {
        this.mapInit.then(function () {
          if (_this5.scaleControl) {
            _this5.map.removeControl(_this5.scaleControl);
          }
          _this5.scaleControl = _this5.L.control.scale(newValue).addTo(_this5.map);
        });
      }
    };

    LeafletCustomElement.prototype.attached = function attached() {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        var center = _this6.mapOptions.center;
        delete _this6.mapOptions.center;
        if (!_this6.map) {
          _this6.map = new _this6.L.map(_this6.mapContainer, _this6.mapOptions);
        }
        _this6.mapOptions.center = center;

        if (_this6.map) {
          _this6.mapInitResolve();
        } else {
          _this6.mapInitReject();
          reject();
        }

        resolve();

        if (_this6.mapEvents) {
          _this6.eventsBound.then(function () {
            _this6.map.setView([_this6.mapOptions.center.lat, _this6.mapOptions.center.lng], _this6.mapOptions.zoomLevel);
          });
        } else {
          _this6.map.setView([_this6.mapOptions.center.lat, _this6.mapOptions.center.lng], _this6.mapOptions.zoomLevel);
        }
      });
    };

    LeafletCustomElement.prototype.attachLayers = function attachLayers() {
      var _this7 = this;

      var layersToAttach = {
        base: {},
        overlay: {}
      };
      if (this.layers.hasOwnProperty('base')) {
        for (var _iterator3 = this.layers.base, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref3;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
          }

          var layer = _ref3;

          layersToAttach.base[this.getLayerId(layer)] = this.layerFactory.getLayer(layer);
        }
      }
      if (this.layers.hasOwnProperty('overlay')) {
        for (var _iterator4 = this.layers.overlay, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
          var _ref4;

          if (_isArray4) {
            if (_i4 >= _iterator4.length) break;
            _ref4 = _iterator4[_i4++];
          } else {
            _i4 = _iterator4.next();
            if (_i4.done) break;
            _ref4 = _i4.value;
          }

          var _layer = _ref4;

          layersToAttach.overlay[this.getLayerId(_layer)] = this.layerFactory.getLayer(_layer);
        }
      }
      this.mapInit.then(function () {
        for (var layerId in layersToAttach.base) {
          _this7.attachedLayers.base[layerId] = layersToAttach.base[layerId].addTo(_this7.map);
        }
        for (var _layerId in layersToAttach.overlay) {
          _this7.attachedLayers.overlay[_layerId] = layersToAttach.overlay[_layerId].addTo(_this7.map);
        }
      });
    };

    LeafletCustomElement.prototype.removeOldLayers = function removeOldLayers(oldLayers, type) {
      var _this8 = this;

      if (!oldLayers || !oldLayers.length) {
        return;
      }
      var removedLayers = oldLayers.filter(function (oldLayer) {
        var removed = true;
        if (!_this8.layers.hasOwnProperty(type)) {
          return true;
        }
        for (var _iterator5 = _this8.layers[type], _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
          var _ref5;

          if (_isArray5) {
            if (_i5 >= _iterator5.length) break;
            _ref5 = _iterator5[_i5++];
          } else {
            _i5 = _iterator5.next();
            if (_i5.done) break;
            _ref5 = _i5.value;
          }

          var newLayer = _ref5;

          if (_this8.getLayerId(newLayer) === _this8.getLayerId(oldLayer)) {
            removed = false;
          }
        }
        return removed;
      });

      var _loop = function _loop() {
        if (_isArray6) {
          if (_i6 >= _iterator6.length) return 'break';
          _ref6 = _iterator6[_i6++];
        } else {
          _i6 = _iterator6.next();
          if (_i6.done) return 'break';
          _ref6 = _i6.value;
        }

        var removedLayer = _ref6;

        _this8.mapInit.then(function () {
          var id = _this8.getLayerId(removedLayer);
          if (_this8.attachedLayers[type].hasOwnProperty(id)) {
            _this8.map.removeLayer(_this8.attachedLayers[type][id]);
            delete _this8.attachedLayers[type][_this8.getLayerId(removedLayer)];
          }
        });
      };

      for (var _iterator6 = removedLayers, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
        var _ref6;

        var _ret = _loop();

        if (_ret === 'break') break;
      }
    };

    LeafletCustomElement.prototype.getLayerId = function getLayerId(layer) {
      var id = layer.id ? layer.id : layer.url;
      if (!id) {
        throw new AureliaLeafletException('Not possible to get id for layer. Set the id property');
      }
      return id;
    };

    return LeafletCustomElement;
  }(), _class4.inject = [_leaflet.Leaflet, _aureliaEventAggregator.EventAggregator, Element], _temp), (_descriptor = _applyDecoratedDescriptor(_class3.prototype, 'layers', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class3.prototype, 'mapEvents', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class3.prototype, 'mapOptions', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class3.prototype, 'withLayerControl', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class3.prototype, 'withScaleControl', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class3)) || _class2) || _class2);

  var LayerFactory = function () {
    function LayerFactory(Leaflet) {
      

      this.L = Leaflet;
    }

    LayerFactory.prototype.getLayer = function getLayer(layer) {
      if (!layer.hasOwnProperty('type')) {
        layer.type = 'tile';
      }

      var instance = void 0;

      switch (layer.type) {
        case 'marker':
          instance = this.getMarker(layer);
          break;
        case 'popup':
          instance = this.getPopup(layer);
          break;
        case 'tile':
          instance = this.getTile(layer);
          break;
        case 'wms':
          instance = this.getWMS(layer);
          break;
        case 'canvas':
          instance = this.getCanvas(layer);
          break;
        case 'imageOverlay':
          instance = this.getImageOverlay(layer);
          break;
        case 'polyline':
          instance = this.getPolyline(layer);
          break;
        case 'multiPolyline':
          instance = this.getMultiPolyline(layer);
          break;
        case 'polygone':
          instance = this.getPolygone(layer);
          break;
        case 'multiPolygone':
          instance = this.getMultiPolygone(layer);
          break;
        case 'rectangle':
          instance = this.getRectangle(layer);
          break;
        case 'circle':
          instance = this.getCircle(layer);
          break;
        case 'circleMarker':
          instance = this.getCircleMarker(layer);
          break;
        case 'group':
          instance = this.getLayerGroup(layer);
          break;
        case 'featureGroup':
          instance = this.getFeatureGroup(layer);
          break;
        case 'geoJSON':
          instance = this.getGeoJson(layer);
          break;
        default:
          throw new AureliaLeafletException('Layer type ' + layer.type + ' not implemented');
      }

      if (typeof layer.initCallback === 'function') {
        layer.initCallback(instance);
      }

      if (layer.hasOwnProperty('events')) {
        for (var _iterator7 = layer.events, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
          var _ref7;

          if (_isArray7) {
            if (_i7 >= _iterator7.length) break;
            _ref7 = _iterator7[_i7++];
          } else {
            _i7 = _iterator7.next();
            if (_i7.done) break;
            _ref7 = _i7.value;
          }

          var e = _ref7;

          if (typeof instance.on === 'function') {
            instance.on(e.name, e.callback);
          }
        }
      }

      return instance;
    };

    LayerFactory.prototype.getMarker = function getMarker(layer) {
      if (!layer.hasOwnProperty('latLng')) {
        throw new AureliaLeafletException('No latLng given for layer.type "marker"');
      }
      var marker = this.L.marker(layer.latLng, layer.options);
      if (layer.hasOwnProperty('popupContent')) {
        marker.bindPopup(layer.popupContent).openPopup();
      }
      return marker;
    };

    LayerFactory.prototype.getPopup = function getPopup(layer) {
      var popup = this.L.popup(layer.options);
      if (layer.hasOwnProperty('content')) {
        popup.setContent(layer.content);
      }
      if (layer.hasOwnProperty('latLng')) {
        popup.setLatLng(layer.latLng);
      }
      return popup;
    };

    LayerFactory.prototype.getTile = function getTile(layer) {
      if (!layer.hasOwnProperty('url')) {
        throw new AureliaLeafletException('No url given for layer.type "tile"');
      }
      return this.L.tileLayer(layer.url, layer.options);
    };

    LayerFactory.prototype.getWMS = function getWMS(layer) {
      if (!layer.hasOwnProperty('url')) {
        throw new AureliaLeafletException('No url given for layer.type "wms"');
      }
      return this.L.tileLayer.wms(layer.url, layer.options);
    };

    LayerFactory.prototype.getCanvas = function getCanvas(layer) {
      var l = this.L.tileLayer.canvas(layer.options);
      if (layer.hasOwnProperty('drawTile')) {
        l.drawTile = layer.drawTile;
      }
      if (layer.hasOwnProperty('tileDrawn')) {
        l.tileDrawn = layer.tileDrawn;
      }
      return l;
    };

    LayerFactory.prototype.getImageOverlay = function getImageOverlay(layer) {
      if (!layer.hasOwnProperty('url')) {
        throw new AureliaLeafletException('No url given for layer.type "imageOverlay"');
      }
      if (!layer.hasOwnProperty('imageBounds')) {
        throw new AureliaLeafletException('No imageBounds given for layer.type "imageOverlay"');
      }
      return this.L.imageOverlay(layer.url, layer.imageBounds, layer.options);
    };

    LayerFactory.prototype.getPolyline = function getPolyline(layer) {
      if (!layer.hasOwnProperty('latLngs')) {
        throw new AureliaLeafletException('No latLngs given for layer.type "polyline"');
      }
      return this.L.polyline(layer.latlngs, layer.options);
    };

    LayerFactory.prototype.getMultiPolyline = function getMultiPolyline(layer) {
      if (!layer.hasOwnProperty('latLngs')) {
        throw new AureliaLeafletException('No latLngs given for layer.type "multiPolyline"');
      }
      return this.L.multiPolyline(layer.latlngs, layer.options);
    };

    LayerFactory.prototype.getPolygone = function getPolygone(layer) {
      if (!layer.hasOwnProperty('latLngs')) {
        throw new AureliaLeafletException('No latLngs given for layer.type "polygone"');
      }
      return this.L.polygone(layer.latlngs, layer.options);
    };

    LayerFactory.prototype.getMultiPolygone = function getMultiPolygone(layer) {
      if (!layer.hasOwnProperty('latLngs')) {
        throw new AureliaLeafletException('No latLngs given for layer.type "multiPolygone"');
      }
      return this.L.multiPolygone(layer.latlngs, layer.options);
    };

    LayerFactory.prototype.getRectangle = function getRectangle(layer) {
      if (!layer.hasOwnProperty('bounds')) {
        throw new AureliaLeafletException('No bounds given for layer.type "rectangle"');
      }
      return this.L.rectangle(layer.bounds, layer.options);
    };

    LayerFactory.prototype.getCircle = function getCircle(layer) {
      if (!layer.hasOwnProperty('latLng')) {
        throw new AureliaLeafletException('No latLng given for layer.type "circle"');
      }
      if (!layer.hasOwnProperty('radius')) {
        throw new AureliaLeafletException('No radius given for layer.type "circle"');
      }
      return this.L.circle(layer.latLng, layer.radius, layer.options);
    };

    LayerFactory.prototype.getCircleMarker = function getCircleMarker(layer) {
      if (!layer.hasOwnProperty('latLng')) {
        throw new AureliaLeafletException('No latLng given for layer.type "circleMarker"');
      }
      return this.L.circleMarker(layer.latLng, layer.options);
    };

    LayerFactory.prototype.getLayerGroup = function getLayerGroup(layer) {
      if (!layer.hasOwnProperty('layers')) {
        throw new AureliaLeafletException('No layers given for layer.type "group"');
      }
      var layers = [];
      for (var _iterator8 = layer.layers, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
        var _ref8;

        if (_isArray8) {
          if (_i8 >= _iterator8.length) break;
          _ref8 = _iterator8[_i8++];
        } else {
          _i8 = _iterator8.next();
          if (_i8.done) break;
          _ref8 = _i8.value;
        }

        var l = _ref8;

        layers.push(this.getLayer(l));
      }
      return this.L.layerGroup(layers);
    };

    LayerFactory.prototype.getFeatureGroup = function getFeatureGroup(layer) {
      if (!layer.hasOwnProperty('layers')) {
        throw new AureliaLeafletException('No layers given for layer.type "featureGroup"');
      }
      var layers = [];
      for (var _iterator9 = layer.layers, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
        var _ref9;

        if (_isArray9) {
          if (_i9 >= _iterator9.length) break;
          _ref9 = _iterator9[_i9++];
        } else {
          _i9 = _iterator9.next();
          if (_i9.done) break;
          _ref9 = _i9.value;
        }

        var l = _ref9;

        layers.push(this.getLayer(l));
      }
      return this.L.featureGroup(layers);
    };

    LayerFactory.prototype.getGeoJson = function getGeoJson(layer) {
      if (!layer.hasOwnProperty('data')) {
        throw new AureliaLeafletException('No data property given for layer.type "geoJSON"');
      }
      return this.L.geoJson(layer.data, layer.options);
    };

    return LayerFactory;
  }();

  exports.default = LayerFactory;
});