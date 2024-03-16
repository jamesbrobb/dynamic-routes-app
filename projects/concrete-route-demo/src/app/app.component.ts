import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {AppLayoutContainerComponent} from "@jamesbenrobb/dynamic-route-app";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AppLayoutContainerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
