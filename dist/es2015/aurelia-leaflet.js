import { PLATFORM } from 'aurelia-pal';

export function configure(frameworkConfig) {
    frameworkConfig.globalResources(PLATFORM.moduleName('./leaflet'));
}