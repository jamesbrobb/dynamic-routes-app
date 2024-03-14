import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {ComponentLoaderMapService} from "@jamesbenrobb/ui";


export function getSideMenuComponentProviders(): EnvironmentProviders {

  return makeEnvironmentProviders([{
    provide: ComponentLoaderMapService,
    useValue:  {
      'default-side-menu': {
        import: () => import('../side-menu/side-menu.component'),
        componentName: 'SideMenuComponent'
      }
    },
    multi: true
  }]);
}
