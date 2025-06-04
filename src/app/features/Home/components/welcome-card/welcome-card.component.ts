import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-welcome-card',
  imports: [],
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.css'
})
export class WelcomeCardComponent {
@Input() link=[""];
@Input() imageSrc="";
@Input() title="";
@Input() description=""
}
