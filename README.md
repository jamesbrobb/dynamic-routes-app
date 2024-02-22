# Dynamic Route App

## What.

A simple configurable shell for quickly creating applications with dynamic routing. [Demo.](https://dynamic-routes-app-demo.jamesrobb.work/)

## Why.

Whilst creating Documentor (which required dynamic/configurable routes) it occurred to me that it may be useful to abstract out the underlying implementation/behaviour to use for other apps. So i did.    

## What not.

A replacement for more complex routing. 

## How.

### Install

```bash
npm i @jamesbenrobb/dynamic-route-app@latest
```

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

### Declare styles

```scss
@use "@jamesbenrobb/dynamic-route-app/styles/jbr-dra-styles" as dra;

@include dra.setJBRDRAVars();
```
