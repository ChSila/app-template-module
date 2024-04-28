import { Component, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutService } from './services/layout.service';
import { Router } from '@angular/router';
import { TopbarComponent } from './components/topbar/topbar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: ``,
})
export class LayoutComponent implements OnDestroy {
  overlayMenuOpenSubscription: Subscription;
  menuOutsideClickListener: any;

  @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;
  @ViewChild(TopbarComponent) appTopbar!: TopbarComponent;

  constructor(
    public layoutService: LayoutService,
    public rederer: Renderer2,
    public router: Router
  ) {
    this.overlayMenuOpenSubscription =
      this.layoutService.overlayOpen$.subscribe(() => {
        if (!this.menuOutsideClickListener) {
          console.log('outside click', this.menuOutsideClickListener);
          this.menuOutsideClickListener = this.rederer.listen(
            'document',
            'click',
            (event) => {
              console.log('even click', event.target);
              const isOutsideClicked = !(
                this.appSidebar.el.nativeElement.isSameNode(event.target) ||
                this.appSidebar.el.nativeElement.contains(event.target) ||
                this.appTopbar.menuButton.nativeElement.isSameNode(
                  event.target
                ) ||
                this.appTopbar.menuButton.nativeElement.contains(event.target)
              );
              console.log('isOutSideClicked :', isOutsideClicked);
              if (isOutsideClicked) {
                this.hideMenu();
              }
            }
          );
        }
        if (this.layoutService.state.staticMenuMobileActive) {
          console.log('Run', this.blockBodyScroll());
          this.blockBodyScroll();
        }
      });
    console.log('Return', this.containerClass);
    console.log('hidemenu', this.hideMenu());
  }

  hideMenu() {
    this.layoutService.state.overlayMenuActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    this.layoutService.state.menuHoverActive = false;
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  }

  get containerClass() {
    return {
      'layout-overlay': this.layoutService.config.menuMode === 'overlay',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-static': this.layoutService.config.menuMode === 'static',
      'layout-static-inactive':
        this.layoutService.state.staticMenuDesktopInactive &&
        this.layoutService.config.menuMode === 'static',
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
    };
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
}
