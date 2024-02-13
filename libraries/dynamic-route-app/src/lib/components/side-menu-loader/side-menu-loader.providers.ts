import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {ComponentLoaderMap, ComponentLoaderMapService} from "@jamesbenrobb/ui";


const componentMap: ComponentLoaderMap = {
  'default-side-menu': {
    import: () => import('../side-menu/side-menu.component'),
    componentName: 'SideMenuComponent'
  },
}


export function getDefaultSideMenuProviders(): EnvironmentProviders {

  return makeEnvironmentProviders([{
    provide: ComponentLoaderMapService,
    useValue: componentMap,
    multi: true
  }]);
}
