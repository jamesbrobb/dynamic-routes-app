import {EnvironmentProviders, importProvidersFrom, Provider, Type} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {getComponentLoaderProviders, registerButtonIcons} from "@jamesbenrobb/ui";
import {ContentNodeContentType, getAllChildNodes, getRouteProviders} from "./route";
import {getMenuProviders} from "./config";
import {getSideMenuComponentProviders} from "./components/side-menu-loader/side-menu-loader.providers";
import {getContentComponentProviders} from "./components/app-content-loader/app-content-loader.providers";


export type JBRDRAAppProviderOptions<T extends ContentNodeContentType> = {
  appName?: string,
  sideMenuComponentType?: string,
  contentComponentType?: string,
  getAllChildNodes?: getAllChildNodes<T>
}


export function getJBRDRAAppProviders<T extends ContentNodeContentType>(
  routeConfigPath: string,
  options?: JBRDRAAppProviderOptions<T>
): (Provider | EnvironmentProviders)[] {
  return [
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule
    ),
    ...getRouteProviders<T>(
      routeConfigPath,
      options?.appName || '',
      options?.getAllChildNodes
    ),
    getMenuProviders(),
    getComponentLoaderProviders(),
    getSideMenuComponentProviders(options?.sideMenuComponentType),
    getContentComponentProviders(options?.contentComponentType),
    registerButtonIcons('assets/icons/')
  ];
}
