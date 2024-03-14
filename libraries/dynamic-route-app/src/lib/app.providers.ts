import {EnvironmentProviders, importProvidersFrom, Provider} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {getComponentLoaderProviders, registerButtonIcons} from "@jamesbenrobb/ui";
import {getSideMenuComponentProviders} from "./components/side-menu-loader/side-menu-loader.providers";
import {getMenuProviders} from "./providers/menu.providers";
import {AppSettings} from "./app.settings";
import {DEFAULT_SIDE_MENU_COMPONENT} from "./components/side-menu-loader/side-menu-loader.directive";


export function getJBRDRAAppProviders(settings?: AppSettings): (Provider | EnvironmentProviders)[] {
  return [
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule
    ),
    getMenuProviders(),
    getComponentLoaderProviders(),
    getSideMenuComponentProviders(),
    registerButtonIcons('assets/icons/'),
    {
      provide: AppSettings,
      useValue: {
        showColorModeBtn: settings?.showColorModeBtn ?? true,
        showBreadcrumbs: settings?.showBreadcrumbs ?? true,
        sideMenuComponentType: settings?.sideMenuComponentType ?? DEFAULT_SIDE_MENU_COMPONENT
      }
    }
  ];
}
