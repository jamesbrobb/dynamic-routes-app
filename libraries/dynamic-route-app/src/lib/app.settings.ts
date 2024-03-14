import {InjectionToken} from "@angular/core";
import {DEFAULT_SIDE_MENU_COMPONENT} from "./components/side-menu-loader/side-menu-loader.directive";


export type AppSettings = {
  showColorModeBtn?: boolean,
  showBreadcrumbs?: boolean,
  sideMenuComponentType?: string
}

export const AppSettings = new InjectionToken<AppSettings>('AppSettings', {
  factory: () => ({
    showColorModeBtn: true,
    showBreadcrumbs: true,
    sideMenuComponentType: DEFAULT_SIDE_MENU_COMPONENT
  })
});
