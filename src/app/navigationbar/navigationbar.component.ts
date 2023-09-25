import { Component } from '@angular/core';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css'],
})
export class NavigationbarComponent {

  mobileMenu = false;

  onClick() {
    this.mobileMenu = !this.mobileMenu;
  }


}
