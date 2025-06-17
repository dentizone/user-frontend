import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
    imports: [FormsModule]
})
export class AddressFormComponent {
  @Input() address: string = '';
  @Input() city: string = '';
  @Output() addressChange = new EventEmitter<string>();
  @Output() cityChange = new EventEmitter<string>();

  cities: string[] = ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan'];
}
