import { PLATFORM } from 'aurelia-pal';
import LeafletCustomElement from './leaflet';

export function configure(frameworkConfig) 
    //LeafletDefaultImagePath = 'jspm_packages/npm/leaflet@1.0.2/dist/images/'
//    LeafletDefaultImagePath = '../leaflet/dist/images/';
    //  } = {}) {
    
//    Leaflet.Icon.Default.imagePath = LeafletDefaultImagePath;
{
//    Leaflet.Icon.Default.imagePath = null;
    frameworkConfig.globalResources(PLATFORM.moduleName('./leaflet'));
  }

export { LeafletCustomElement };
