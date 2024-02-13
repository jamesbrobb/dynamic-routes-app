import {EnvironmentProviders, importProvidersFrom, Provider, Type} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {getComponentLoaderProviders} from "@jamesbenrobb/ui";
import {ContentNodeContentType, getAllChildNodes, getRouteProviders, JBRDRARootRouteComponent} from "./route";
import {getMenuProviders} from "./config";
import {getDefaultSideMenuProviders} from "./components/side-menu-loader/side-menu-loader.providers";
import {MenuComponentTypeService} from "./components/side-menu-container/side-menu-container.component";


export type JBRDRAAppProviderOptions<T extends ContentNodeContentType> = {
  appName?: string,
  sideMenuComponentType?: string,
  rootComponent?: Type<JBRDRARootRouteComponent<T>>,
  getAllChildNodes?: getAllChildNodes<T>
}


export function getJBRDRAAppProviders<T extends ContentNodeContentType>(
  routeConfigPath: string,
  options?: JBRDRAAppProviderOptions<T>
): (Provider | EnvironmentProviders)[] {
  return [
    importProvidersFrom(
      BrowserAnimationsModule
    ),
    ...getRouteProviders<T>(
      routeConfigPath,
      options?.appName || '',
      options?.rootComponent,
      options?.getAllChildNodes
    ),
    getMenuProviders(),
    getComponentLoaderProviders(),
    getDefaultSideMenuProviders(),
    {
      provide: MenuComponentTypeService,
      useValue: options?.sideMenuComponentType || 'default-side-menu'
    }
  ];
}
