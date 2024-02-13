import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {ComponentLoaderMapService} from "@jamesbenrobb/ui";
import {MenuComponentTypeService} from "../side-menu-container/side-menu-container.component";


export function getSideMenuComponentProviders(sideMenuComponentType?: string): EnvironmentProviders {

  return makeEnvironmentProviders([{
    provide: ComponentLoaderMapService,
    useValue:  {
      'default-side-menu': {
        import: () => import('../side-menu/side-menu.component'),
        componentName: 'SideMenuComponent'
      }
    },
    multi: true
  }, {
    provide: MenuComponentTypeService,
    useValue: sideMenuComponentType || 'default-side-menu'
  }]);
}
