import {
  AureliaLeafletException
} from '../aurelia-leaflet-exceptions';

//export default class LayerFactory {
export declare class LayerFactory {
  constructor(Leaflet?: any);
  getLayer(layer?: any): any;
  getMarker(layer?: any): any;
  getPopup(layer?: any): any;
  getTile(layer?: any): any;
  getWMS(layer?: any): any;
  getCanvas(layer?: any): any;
  getImageOverlay(layer?: any): any;
  getPolyline(layer?: any): any;
  getMultiPolyline(layer?: any): any;
  getPolygone(layer?: any): any;
  getMultiPolygone(layer?: any): any;
  getRectangle(layer?: any): any;
  getCircle(layer?: any): any;
  getCircleMarker(layer?: any): any;
  getLayerGroup(layer?: any): any;
  getFeatureGroup(layer?: any): any;
  getGeoJson(layer?: any): any;
}