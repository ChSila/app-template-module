import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styles: ``
})
export class TopbarComponent {

  @ViewChild('menubutton') menuButton!: ElementRef;
  constructor(
    public layoutServices: LayoutService
  ) { }
}
