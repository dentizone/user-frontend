import { Component } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  imports: [],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent {
  userName="Nourhane"
  generatedName="User-1234"
  userEmail="nourhane@gmail.com"
  verificationStatus="verified"
  academicYear="Year 5"
  userUniversity="Alexanria University"
  userPhoneNumber="+201210082921"
  userAddress="Smouha, Alexanria"

}
