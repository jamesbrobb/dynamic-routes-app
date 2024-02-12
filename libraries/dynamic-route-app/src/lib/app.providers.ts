import {EnvironmentProviders, importProvidersFrom, Provider, Type} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ContentNodeContentType, getAllChildNodes, getRouteProviders, JBRDRARootRouteComponent} from "./route";
import {getMenuProviders} from "./config";


export function getJBRDRAAppProviders<T extends ContentNodeContentType>(
  routeConfigPath: string,
  appName: string,
  rootComponent?: Type<JBRDRARootRouteComponent<T>>,
  getAllChildNodes?: getAllChildNodes<T>
): (Provider | EnvironmentProviders)[] {
  return [
    importProvidersFrom(
      BrowserAnimationsModule
    ),
    ...getRouteProviders<T>(
      routeConfigPath,
      appName,
      rootComponent,
      getAllChildNodes
    ),
    getMenuProviders()
  ];
}
