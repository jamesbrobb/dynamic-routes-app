import {ComponentLoaderMapService} from "@jamesbenrobb/ui";
import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {ContentComponentTypeService} from "../../route/components/root-route.component";


export function getContentComponentProviders(componentType?: string): EnvironmentProviders {

  return makeEnvironmentProviders([{
    provide: ComponentLoaderMapService,
    useValue: {
      'default-app-content': {
        import: () => import('../app-content/app-content.component'),
        componentName: 'DefaultAppContentComponent'
      },
    },
    multi: true
  }, {
    provide: ContentComponentTypeService,
    useValue: componentType || 'default-app-content'
  }]);
}
