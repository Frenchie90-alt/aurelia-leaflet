import {
  PLATFORM
} from 'aurelia-pal';
import {
  customElement,
  useView,
  bindable
} from 'aurelia-framework';
import {
  EventAggregator
} from 'aurelia-event-aggregator';
import {
  Leaflet
} from 'leaflet';
export declare class AureliaLeafletException {
  name: any;
  constructor(message?: any);
}
export declare function configure(frameworkConfig?: any): any;

////export { LeafletCustomElement };
export declare var defaultMapOptions: any;
export declare var defaultLayers: any;
export declare class LeafletCustomElement {
  static inject: any;
  layers: any;
  mapEvents: any;
  mapOptions: any;
  withLayerControl: any;
  withScaleControl: any;
  map: any;
  attachedLayers: any;
  constructor(leaflet?: any, eventAggregator?: any, element?: any);
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
export declare {
  LayerFactory as default
};