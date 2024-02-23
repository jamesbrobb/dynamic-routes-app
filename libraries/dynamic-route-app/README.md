# Dynamic Route App

## What.

A simple configurable shell for quickly creating applications with dynamic routing. [Demo.](https://dynamic-routes-app-demo.jamesrobb.work/)
<br/>
<br/>

## Why.

Whilst creating Documentor (which required dynamic/configurable routes) it occurred to me that it may be useful to abstract out the underlying implementation/behaviour to use for other apps. So i did.
<br/>
<br/>

## What not.

A replacement for more complex routing.
<br/>
<br/>

## How.

1. [Install](#install)
2. [Define route config json](#define-route-config-json)
3. [Add provider](#add-provider)
4. [Declare styles](#declare-styles)
5. [Extending for your own use](#extending-for-your-own-use)
   <br/>
   <br/>

### Install

```bash
npm i @jamesbenrobb/dynamic-route-app@latest
```
<br/>

### Define route config json

```json
{
  "routes": [{
    "path": "/",
    "redirectTo": "one"
  }, {
    "path": "one",
    "content": {
      "someProp": "someValue"
    }
  }, {
    "path": "two",
    "label": "2",
    "content": {
      "someOtherProp": "someOtherValue"
    },
    "children": [{
      "path": "two-first-child",
      "content": {}
    }]
  }, {
    "path": "three",
    "content": {
      "someOtherProp": "someOtherValue"
    },
    "children": [{
      "path": "three-first-child",
      "content": {}
    }, {
      "path": "three-second-child",
      "content": {},
      "children": [{
        "path": "three-second-child-first-child",
        "content": {}
      }]
    }]
  }]
}
```
<br/>

### Add provider

```ts
import {ApplicationConfig} from '@angular/core';
import {getJBRDRAAppProviders} from "@jamesbenrobb/dynamic-route-app";


export const appConfig: ApplicationConfig = {
  providers: [
    ...getJBRDRAAppProviders(
      'assets/route-config.json',
      {appName: 'Demo App'}
    )
  ]
};
```
<br/>

### Declare styles

```scss
@use "@jamesbenrobb/dynamic-route-app/styles/jbr-dra-styles" as dra;

@include dra.setJBRDRAVars();
```
<br/>

## Extending for your own use
<br/>

### Provider options

```ts
export type JBRDRAAppProviderOptions<T extends ContentNodeContentType> = {
  appName?: string
  getAllChildNodes?: getAllChildNodes<T>
  contentComponentType?: string
  sideMenuComponentType?: string
}
```
<br/>

### Add your own content component

Create a component that implements [`ContentLoaderComponentIO`](https://github.com/jamesbrobb/dynamic-routes-app/blob/main/libraries/dynamic-route-app/src/lib/components/app-content-loader/app-content-loader.directive.ts#L7)

```ts
import {Component} from "@angular/core";
import {ContentLoaderComponentIO} from "@jamesbenrobb/dynamic-routes-app";

@Component({
  selector: 'my-content-component',
  templateUrl: "...",
  styleUrls: ['...'],
  standalone: true
})
export class MyContentComponent implements ContentLoaderComponentIO<YourContentType> {
  routeNodes: RouteNode<YourContentType>[] | undefined
  currentNode: RouteNode<YourContentType> | undefined
  currentContent: YourContentType | undefined
}
```

Register the component with the `ComponentLoaderMapService` (see details on registering components [here](https://github.com/jamesbrobb/jbr/tree/main/libraries/ui/src/lib/component-loader)) and add the provider to your app

```ts
import {Provider} from "@angular/core";
import {ComponentLoaderMapService} from "@jamesbenrobb/ui";


const provider: Provider = {
  provide: ComponentLoaderMapService,
  useValue: {
    'my-content-component': {
      import: () => import('./my-content.component'),
      componentName: 'MyContentComponent'
    }
  },
  multi: true
}
```

Supply the registered name of you content component to `getJBRDRAAppProviders`

```ts
import {ApplicationConfig} from '@angular/core';
import {getJBRDRAAppProviders} from "@jamesbenrobb/dynamic-route-app";


export const appConfig: ApplicationConfig = {
  providers: [
    ...getJBRDRAAppProviders(
      'assets/route-config.json',
      {
        appName: 'My app name',
        contentComponentType: 'my-content-component'
      }
    )
  ]
};
```

<br/>

### Add your own menu

### Add your own header content

### Declaring light and dark themes
