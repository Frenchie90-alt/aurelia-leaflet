import {
  customElement,
  useView,
  bindable
} from 'aurelia-framework';
import {
  EventAggregator
} from 'aurelia-event-aggregator';
import {
  AureliaLeafletException
} from './aurelia-leaflet-exceptions';
import {
  defaultMapOptions,
  defaultLayers
} from './leaflet-defaults';
import {
  LayerFactory
} from './helpers/layer-factory';
import {
  Leaflet
} from 'leaflet';
export declare class LeafletCustomElement {
  static inject: any;
  layers: any;
  mapEvents: any;
  mapOptions: any;
  withLayerControl: any;
  withScaleControl: any;
  map: any;
  attachedLayers: any;
  constructor(Leaflet?: any, EventAggregator?: any, Element?: any);
  layersChanged(newLayers?: any, oldLayers?: any): any;
  mapOptionsChanged(newOptions?: any, oldOptions?: any): any;
  mapEventsChanged(newEvents?: any, oldEvents?: any): any;
  withLayerControlChanged(newValue?: any): any;
  withScaleControlChanged(newValue?: any): any;
  attached(): any;
  attachLayers(): any;
  removeOldLayers(oldLayers?: any, type?: any): any;
  getLayerId(layer?: any): any;
}