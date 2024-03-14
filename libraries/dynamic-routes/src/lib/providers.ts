import {EnvironmentProviders, Provider} from "@angular/core";
import {getMenuProviders, getRouteProviders} from "./ng";
import {ContentNodeContentType, getAllChildNodes} from "./core";
import {getContentComponentProviders} from "./components/app-content-loader/app-content-loader.providers";



export function getAppProviders<T extends ContentNodeContentType>(
  configPath: string,
  appName: string = 'Demo App',
  getAllChildNodes?: getAllChildNodes<T>
): (Provider | EnvironmentProviders)[] {
  return [
    getMenuProviders(),
    getRouteProviders(
      configPath,
      appName,
      getAllChildNodes
    ),
    getContentComponentProviders() // options?.contentComponentType
  ]
}
