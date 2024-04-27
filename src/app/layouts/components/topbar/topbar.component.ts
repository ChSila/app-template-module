import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styles: ``
})
export class TopbarComponent {
  constructor(
    public layoutServices: LayoutService
  ) { }
}
