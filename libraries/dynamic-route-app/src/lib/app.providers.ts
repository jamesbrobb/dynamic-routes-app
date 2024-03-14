import {EnvironmentProviders, importProvidersFrom, Provider} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {getComponentLoaderProviders, registerButtonIcons} from "@jamesbenrobb/ui";
import {getSideMenuComponentProviders} from "./components/side-menu-loader/side-menu-loader.providers";
import {getMenuProviders} from "./providers/menu.providers";
import {getRouteProviders} from "./providers/route.providers";


export type JBRDRAAppProviderOptions = {
  appName?: string,
  sideMenuComponentType?: string
}


export function getJBRDRAAppProviders(
  options?: JBRDRAAppProviderOptions
): (Provider | EnvironmentProviders)[] {
  return [
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule
    ),
    getRouteProviders(),
    getMenuProviders(),
    getComponentLoaderProviders(),
    getSideMenuComponentProviders(options?.sideMenuComponentType),
    registerButtonIcons('assets/icons/')
  ];
}
