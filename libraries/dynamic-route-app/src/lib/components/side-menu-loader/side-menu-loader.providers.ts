import {EnvironmentProviders, makeEnvironmentProviders, Provider} from "@angular/core";
import {ComponentLoaderMapService} from "@jamesbenrobb/ui";
import {MenuComponentTypeService} from "../side-menu-container/side-menu-container.component";


export function getSideMenuComponentProviders(sideMenuComponentType?: string): EnvironmentProviders {

  const providers: Provider[] = [{
    provide: ComponentLoaderMapService,
    useValue:  {
      'default-side-menu': {
        import: () => import('../side-menu/side-menu.component'),
        componentName: 'SideMenuComponent'
      }
    },
    multi: true
  }];

  if(sideMenuComponentType) {
    providers.push({
      provide: MenuComponentTypeService,
      useValue: sideMenuComponentType
    });
  }

  return makeEnvironmentProviders([providers]);
}
