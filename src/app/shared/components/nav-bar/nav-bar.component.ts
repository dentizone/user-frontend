import { CommonModule } from '@angular/common';
import { Component,HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
opened=false;
UserName="Nourhane"
UserEmail="nourhane@gmail.com"
opendropdown(){
   this.opened = !this.opened;
}
@HostListener('document:click', ['$event'])
onClickOutside(event: Event) {
  const target = event.target as HTMLElement;
  const inside = target.closest('#user-menu-button') || target.closest('#user-dropdown');
  if (!inside) this.opened = false;
}
}
