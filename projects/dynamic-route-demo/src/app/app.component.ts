import { Component } from '@angular/core';
import {AppLayoutContainerComponent} from "@jamesbenrobb/dynamic-route-app";
import {AppContentContainerComponent} from "@jamesbenrobb/dynamic-routes";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppLayoutContainerComponent,
    AppContentContainerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
