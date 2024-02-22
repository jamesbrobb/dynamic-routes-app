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
