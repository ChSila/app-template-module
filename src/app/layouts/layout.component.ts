import { Component, Renderer2, ViewChild } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutService } from './services/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: ``
})
export class LayoutComponent {
  containerClass = '';
  @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;

  constructor(
    public layoutService: LayoutService,
    public rederer: Renderer2,
    public router: Router
  ){}
}
