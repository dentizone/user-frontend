import { Component } from '@angular/core';
import { PersonalInfoComponent } from "../components/personal-info/personal-info.component";

@Component({
  selector: 'app-profile-container',
  imports: [PersonalInfoComponent],
  templateUrl: './profile-container.component.html',
  styleUrl: './profile-container.component.css'
})
export class ProfileContainerComponent {

}
