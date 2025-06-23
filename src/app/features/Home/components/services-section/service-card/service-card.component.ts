import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-service-card',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
@Input() link="";
@Input() imageSrc="";
@Input() title="";
@Input() description=""

  constructor(private readonly router: Router) {}
  onclick(){
    console.log(this.router.url +" clicked")
  }
}
