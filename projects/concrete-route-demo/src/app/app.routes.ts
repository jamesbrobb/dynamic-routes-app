import {Routes} from '@angular/router';
import {RootRouteComponent} from "./route-components/root-route/root-route.component";


export const routes: Routes = [{
  path: '',
  redirectTo: 'one',
  pathMatch: 'full'
}, {
  path: 'one',
  component: RootRouteComponent,
  data: {
    someProp: "someValue"
  }
}, {
  path: 'two',
  title: '2',
  component: RootRouteComponent,
  data: {
    someOtherProp: "someOtherValue"
  },
  children: [{
    path: "two-first-child",
    component: RootRouteComponent,
    data: {}
  }]
}, {
  path: 'three',
  component: RootRouteComponent,
  data: {
    someOtherProp: "someOtherValue"
  },
  children: [{
    path: "three-first-child",
    component: RootRouteComponent,
    data: {}
  }, {
    path: "three-second-child",
    component: RootRouteComponent,
    data: {},
    children: [{
      path: "three-second-child-first-child",
      component: RootRouteComponent,
      data: {}
    }]
  }]
}];
